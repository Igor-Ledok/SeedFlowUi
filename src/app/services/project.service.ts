import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { ProjectData } from '../models/project/send/project-data.interface';
import { Observable, catchError, map, tap, throwError } from 'rxjs';
import { general } from '../models/project/send/general.interface';
import { details } from '../models/project/send/datails.interface';
import { TeamMember } from '../models/project/send/team-member.interface';
import { Reward } from '../models/project/send/reward.interface';
import { requisites } from '../models/project/send/requisites.interface';
import { environment } from '../../environment';
import { AuthService } from './auth.service';
import { CompleteProjectData } from '../models/project/send/completeproject-data';
import { ProjectList } from '../models/project/return/project-list-data';
import { CategoryDto, TopicDto } from '../models/project/topic.interface';
import { detailsdescription } from '../models/project/send/datailsDescription.interface';
import { ReturnProjectDto } from '../models/project/return/return-project.model';
import { DonationRequest } from '../models/donation/RequestDonationDto';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private projectData: ProjectData = {} as ProjectData;
  private teamMembers: TeamMember[] = [];
  private rewards: Reward[] = [];
  private projectPhotos: string[] = [];
  private Descriptions: detailsdescription[] = [];
  selectedFileNameDocx: string = '';
  BudgetArticlesFileName: string = '';
  private agreement: boolean;

  private returnProjectData: ReturnProjectDto = {} as ReturnProjectDto;
  
  baseUrl = environment.baseApiUrl + 'api/project';

  constructor(private http: HttpClient, private authService: AuthService) {}

  //Generel
  getProjectDataGenerel(general: general): void {
    this.projectData = { ...this.projectData, ...general };
    this.selectedFileNameDocx = general.SelectedFileNameDocx;
  }
  returnProjectDataGeneral(): general {
    return {
      Title: this.projectData.Title,
      CollectionAmount: this.projectData.CollectionAmount,
      BudgetPlan: this.projectData.BudgetPlan,
      SelectedFileNameDocx: this.selectedFileNameDocx,
      CollectionDuration: this.projectData.CollectionDuration,
      BudgetPlanUrl: this.projectData.BudgetPlanUrl,
      YouTubeVideoUrl: this.projectData.YouTubeVideoUrl,
      MainPhotoUrl: this.projectData.MainPhotoUrl,
      SelectedCategoryId: this.projectData.SelectedCategoryId,
    };
  }
  //Details 
  getProjectDataDetails(details: details): void {
    this.projectData = { ...this.projectData, ...details };
    this.BudgetArticlesFileName = details.BudgetArticlesFileName;
  }
  getProjectDataDetailsProjectDescription(detailsDescription: detailsdescription): void {
    if (detailsDescription){
      this.Descriptions.push(detailsDescription);
    }
  }
  getProjectDataDetailsProjectPhotos(projectPhotos: string): void {
    if (projectPhotos){
      this.projectPhotos.push(projectPhotos);
    }
  }
  getProjectDataDetailsProjectPhotosSize(): number {
    return this.projectPhotos.length;
  }
  getProjectDataDetailsProjectDescriptionSize(): number {
    return this.Descriptions.length;
  }
  getProjectname(): string {
    return this.projectData.Title;
  }
  
  
  returnProjectDataDetails(): details {
    return {
      ShortDescription: this.projectData.ShortDescription,
      Phone: this.projectData.Phone,
      Telegram: this.projectData.Telegram,
      Viber: this.projectData.Viber,
      WhatsApp: this.projectData.WhatsApp,
      LinkedIn: this.projectData.LinkedIn,
      YouTubeVideoUrl: this.projectData.YouTubeVideoUrl,
      Email: this.projectData.Email,
      Address: this.projectData.Address, 
      BudgetArticles: this.projectData.BudgetArticles,
      BudgetArticlesUrl: this.projectData.BudgetArticlesUrl,
      BudgetArticlesFileName: this.BudgetArticlesFileName,
      Instagram: this.projectData.Instagram,
      Facebook: this.projectData.Facebook,
      TelegramChannel: this.projectData.TelegramChannel,
      Twitter: this.projectData.Twitter,
      LinkedInGroup: this.projectData.LinkedInGroup
    };
  }
  returnProjectDataDetailsProjectDescription(index: number): detailsdescription {
    return this.Descriptions[index];
  }
  returnProjectDataDetailsProjectPhotos(index: number): string {
    return this.projectPhotos[index];
  }
  ProjectDataDetailsProjectPhotosClear(): void {
    this.projectPhotos = [];
  }
  ProjectDataDetailsProjectDescriptionClear() : void {
    this.Descriptions = [];
  }

  //Team
  clearProjectDataTeam(): void {
    this.teamMembers = [];
  }
  getProjectDataTeam(team: TeamMember): void {
    if (team){
        this.teamMembers.push(team);
    }
  }
  returnProjectDataTeam(index: number): TeamMember {
    return this.teamMembers[index];
  }
  getProjectDataTeamSize(): number {
    return this.teamMembers.length;
  }
  //Rewards
  clearProjectDataRewards(): void {
    this.rewards = [];
  }
  getProjectDataRewards(rewards: Reward): void {
    if (rewards){
        this.rewards.push(rewards);
    }
  }
  returnProjectDataRewards(index: number): Reward {
    return this.rewards[index];
  }
  getProjectDataRewardsSize(): number {
    return this.rewards.length;
  }
//Requiusits
  getProjectDataRequisites(requisites: requisites): void {
    this.projectData = { ...this.projectData, ...requisites };
  }
  getAgreement(agreement: boolean): void {
    this.agreement = agreement;
  }
  returnProjectDataRequisites(): requisites {
    return this.projectData as requisites;
  }
  returnAgreement(): boolean {
    return this.agreement;
  }
//Uploads
    returnProjectDataUploads(): ProjectData {
        return this.projectData;
    }
    returnRewardsDataUploads(index: number): Reward {
        return this.rewards[index];
    }   
    returnteamMembersDataUploads(index: number): TeamMember {
        return this.teamMembers[index];
    } 



  
  // Для отправки данных на сервер
  sendProjectData(): Observable<any> {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token not found in localStorage.');
      return throwError(() => new Error('Token not found.'));
    }

    if (!this.agreement) { 
      console.error('Agreement not accepted.');
      return throwError(() => new Error('Agreement not accepted.'));
    }
  
    if (!this.projectData) { // || Object.keys(this.projectData).length === 0
      console.error('No project data to send.');
      return throwError(() => new Error('No project data.'));
    }

    if (this.teamMembers.length === 0){
      console.log('No teamMembers data to send.')
      return throwError(() => new Error('No teamMembers data.'));
    }
  
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    });
  
    const completeProjectData: CompleteProjectData = 
    {
      Project: this.projectData,
      TeamMembers: this.teamMembers,
      Rewards: this.rewards,
      ProjectPhoto: this.projectPhotos,
      Descriptions: this.Descriptions,
    };

    console.log('Sending project data:', completeProjectData);
  
    return this.http.post( this.baseUrl + "/add", completeProjectData, { headers:headers });
  }

  private handleError(error: HttpErrorResponse) 
  {
    debugger; // Добавляем debugger
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
        errorMessage = `Error: ${error.error.message}`;
    } else {
        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        console.log("Response body:", error.error);
        console.log("Status Code:", error.status);
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }


  getActiveProjects(): Observable<ProjectList[]> {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token not found in localStorage.');
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
      });
      return this.http.get<ProjectList[]>(this.baseUrl + "/list/active", { headers:headers });
    }
    else {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      });
      return this.http.get<ProjectList[]>(this.baseUrl + "/list/active/user", { headers:headers });
    }
  }
  getInactiveProjects(): Observable<ProjectList[]> {
    return this.http.get<ProjectList[]>(this.baseUrl + "/list/inactive");
  }

  getUserProjects(): Observable<ProjectList[]> {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token not found in localStorage.');
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
      });
      return this.http.get<ProjectList[]>(this.baseUrl + "/list/user", { headers:headers });
    }
    else {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      });
      return this.http.get<ProjectList[]>(this.baseUrl + "/list/user/user", { headers:headers });
    }
  }

  getTopics(): Observable<TopicDto[]> {
    return this.http.get<TopicDto[]>(this.baseUrl + "/topics");
  }
  getCategory(): Observable<CategoryDto> {
    return this.http.get<CategoryDto>(this.baseUrl + `/category/${this.projectData.SelectedCategoryId}`); // Example API endpoint
  }


  getProjectById(id: string): Observable<ProjectList> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json', 
    });
    // Вставляем ID в URL
    return this.http.get<ProjectList>(`${this.baseUrl}/byid/${id}`, { headers });
  }

  filterProjects(filterRequest: any): Observable<ProjectList[]> {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token not found in localStorage.');
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
      });
      return this.http.post<ProjectList[]>(this.baseUrl + "/list/filter", filterRequest, { headers:headers });
    }
    else {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      });
      return this.http.post<ProjectList[]>(this.baseUrl + "/list/filter/user", filterRequest, { headers:headers });
    }
  }



  //разделы проектов
  GetProjectsFirstDate(): Observable<ProjectList[]> {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token not found in localStorage.');
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
      });
      return this.http.get<ProjectList[]>(this.baseUrl + "/list/firstdate", { headers:headers });
    }
    else {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      });
      return this.http.get<ProjectList[]>(this.baseUrl + "/list/firstdate/user", { headers:headers });
    }
  }
  GetProjectsLastDate(): Observable<ProjectList[]> {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token not found in localStorage.');
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
      });
      return this.http.get<ProjectList[]>(this.baseUrl + "/list/lastdate", { headers:headers });
    }
    else {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      });
      return this.http.get<ProjectList[]>(this.baseUrl + "/list/lastdate/user", { headers:headers });
    }
  }
  GetProjectsMaxCollection(): Observable<ProjectList[]> {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token not found in localStorage.');
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
      });
      return this.http.get<ProjectList[]>(this.baseUrl + "/list/maxcollection", { headers:headers });
    }
    else {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      });
      return this.http.get<ProjectList[]>(this.baseUrl + "/list/maxcollection/user", { headers:headers });
    }
  }
  GetProjectsMinCollection(): Observable<ProjectList[]> {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token not found in localStorage.');
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
      });
      return this.http.get<ProjectList[]>(this.baseUrl + "/list/mincollection", { headers:headers });
    }
    else {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      });
      return this.http.get<ProjectList[]>(this.baseUrl + "/list/mincollection/user", { headers:headers });
    }
  }
  GetProjectsByMaxPercentage(): Observable<ProjectList[]> {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token not found in localStorage.');
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
      });
      return this.http.get<ProjectList[]>(this.baseUrl + "/list/maxpercentage", { headers:headers });
    }
    else {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      });
      return this.http.get<ProjectList[]>(this.baseUrl + "/list/maxpercentage/user", { headers:headers });
    }
  }
  GetProjectsByMinPercentage(): Observable<ProjectList[]> {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token not found in localStorage.');
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
      });
      return this.http.get<ProjectList[]>(this.baseUrl + "/list/minpercentage", { headers:headers });
    }
    else {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      });
      return this.http.get<ProjectList[]>(this.baseUrl + "/list/minpercentage/user", { headers:headers });
    }
  }


  LikeProject(id: string): Observable<any> {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token not found in localStorage.');
      return throwError(() => new Error('Token not found.'));
    }
  
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    });
  
    
    // Отправляем данные через POST-запрос в теле запроса
    return this.http.post(`${this.baseUrl}/favorite`, { projectId: id }, { headers });
  }

  getLikeProjects(): Observable<ProjectList[]> {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token not found in localStorage.');
      return throwError(() => new Error('Token not found.'));
    }
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    });
    return this.http.get<ProjectList[]>(this.baseUrl + "/list/like", { headers:headers });
  }
  
  getLastThreeProjectById(): Observable<ProjectList[]> {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token not found in localStorage.');
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
      });
      return this.http.get<ProjectList[]>(this.baseUrl + "/list/lastthree", { headers:headers });
    }
    else {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      });
      return this.http.get<ProjectList[]>(this.baseUrl + "/list/lastthree/user", { headers:headers });
    }
  }

  getProjectByCategory(categoryId: string): Observable<ProjectList[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      ...(token ? { 'Authorization': `Bearer ${token}` } : {})
    });
  
    const url = token ? `${this.baseUrl}/list/by-category-auth/${categoryId}` : `${this.baseUrl}/list/by-category/${categoryId}`;
  
    return this.http.get<ProjectList[]>(url, { headers: headers });
  }
  

  getAllInfoProjectById(id: string): Observable<ReturnProjectDto> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.get<ReturnProjectDto>(this.baseUrl + `/get/info/${id}`, { headers:headers });
  }

  donateToProject(projectId: string, donation: DonationRequest): Observable<any> {
    const token = localStorage.getItem('token'); // Получаем JWT из localStorage
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return this.http.post<any>(`${this.baseUrl}/donate/${projectId}`, donation,{ headers }
    );
  }

  getTopFundedActualProject(): Observable<ProjectList> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.get<ProjectList>(this.baseUrl + "/get/top-funded", { headers });
  }

  hasLessThanThreeProjects(): Observable<boolean> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });
  
    return this.http.get<boolean>(`${this.baseUrl}/has-less-than-three-projects`, { headers });
  }

  deleteProject(id: string) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });
    return this.http.delete(`${this.baseUrl}/${id}`, { headers });
  }
}