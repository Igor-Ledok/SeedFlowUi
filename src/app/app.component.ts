import { Component, inject } from '@angular/core';
import { RegistrationComponent } from './registration/registration.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { RegConfirmComponent } from './reg-confirm/reg-confirm.component';
import { RegAccessComponent } from './reg-access/reg-access.component';
import { LoginComponent } from './login/login.component';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { NewPasswordComponent } from './new-password/new-password.component';
import { NewPassAccessComponent } from './new-pass-access/new-pass-access.component';
import { MainPageComponent } from './main-page/main-page.component';
import { RouterModule } from '@angular/router';
import { TranslocoModule, TranslocoService } from '@jsverse/transloco';
import { LanguageService } from './services/language.service';
import { DonationComponent } from "./donation/donation.component";
import { CommentDonationComponent } from "./comment-donation/comment-donation.component";
import { CommentDescriptionAccessComponent } from "./comment-description-access/comment-description-access.component";
import { WithoutCommentDonationAccessComponent } from "./without-comment-donation-access/without-comment-donation-access.component";
import { RewardsComponent } from "./rewards/rewards.component";
import { TeamComponent } from "./team/team.component";
import { UploadsAccessComponent } from "./uploads-access/uploads-access.component";
import { SeeProjectPageComponent } from "./see-project-page/see-project-page.component";
import { CollectionClosedNiceComponent } from "./collection-closed-nice/collection-closed-nice.component";
import { BadCollectionClosedComponent } from "./bad-collection-closed/bad-collection-closed.component";
import { ProjectStatisticsComponent } from "./project-statistics/project-statistics.component";
import { ErrorPageComponent } from "./error-page/error-page.component";
import { AccountSettingsComponent } from "./account-settings/account-settings.component";
import { DisplayedAchievementsComponent } from "./displayed-achievements/displayed-achievements.component";
import { ProfileComponent } from "./profile/profile.component";
import { AnotherProfileComponent } from "./another-profile/another-profile.component";
import { AuthorProfileComponent } from "./author-profile/author-profile.component";
import { AnotherAuthorProfileComponent } from "./another-author-profile/another-author-profile.component";
import { ReachAchievementComponent } from "./reach-achievement/reach-achievement.component";
import { SupportComponent } from "./support/support.component";
import { SearchResultComponent } from "./search-result/search-result.component";
import { SendRequestComponent } from "./send-request/send-request.component";
import { FAQComponent } from "./faq/faq.component";
import { AccompanimentComponent } from "./accompaniment/accompaniment.component";
import { SpecialistHelpComponent } from "./specialist-help/specialist-help.component";
import { ExpertsComponent } from "./experts/experts.component";
import { LegalAndFinancialServicesComponent } from "./legal-and-financial-services/legal-and-financial-services.component";
import { ReadMoreComponent } from "./read-more/read-more.component";
import { MarketingComponent } from "./marketing/marketing.component";
import { MarketingFormComponent } from "./marketing-form/marketing-form.component";
import { MarketingAccessComponent } from "./marketing-access/marketing-access.component";
import { SeminarComponent } from "./seminar/seminar.component";
import { BlogComponent } from "./blog/blog.component";
import { State2Component } from "./state2/state2.component";
import { StateStartUpComponent } from "./state-start-up/state-start-up.component";
import { SeminarsVebinarsComponent } from "./seminars-vebinars/seminars-vebinars.component";
import { Seminar2Component } from "./seminar2/seminar2.component";
import { SeminarSecondComponent } from "./seminar-second/seminar-second.component";
import { SeminarThirdComponent } from "./seminar-third/seminar-third.component";
import { ShopMainPageComponent } from "./shop-main-page/shop-main-page.component";
import { ProjectsListComponent } from "./projects-list/projects-list.component";
import { AboutUsComponent } from "./about-us/about-us.component";
import { RolePageComponent } from "./role-page/role-page.component";
import { TovarPageComponent } from "./tovar-page/tovar-page.component";
import { TovarPage2Component } from "./tovar-page2/tovar-page2.component";
import { EndTovarPageComponent } from "./end-tovar-page/end-tovar-page.component";
import { BasketComponent } from "./basket/basket.component";
import { ProductRegistrationComponent } from "./product-registration/product-registration.component";
import { ShopSuccessComponent } from "./shop-success/shop-success.component";
import { CookieRoolsComponent } from "./cookie-rools/cookie-rools.component";
import { AllCardsComponent } from "./all-cards/all-cards.component";
import { PolicyComponent } from "./policy/policy.component";
import { UsingRoolsComponent } from "./using-rools/using-rools.component";
import { ContactAuthorComponent } from "./contact-author/contact-author.component";
import { BecamingAuthorComponent } from "./becaming-author/becaming-author.component";
import { DetailsComponent } from './details/details.component';
import { GeneralComponent } from './general/general.component';
import { UploadsComponent } from './uploads/uploads.component';
import { RequisitesComponent } from './requisites/requisites.component';
import { ChatComponent } from "./chat/chat.component";
import { AllChatsComponent } from "./all-chats/all-chats.component";
import { MaxProjectsComponent } from "./max-projects/max-projects.component";
import { RootPanelComponent } from "./root-panel/root-panel.component";
import { RootAccountsComponent } from "./root-accounts/root-accounts.component";
import { RootShopTovarsComponent } from "./root-shop-tovars/root-shop-tovars.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    TranslocoModule,
    RegistrationComponent,
    MatSlideToggleModule,
    RegConfirmComponent,
    RegAccessComponent,
    LoginComponent,
    PasswordResetComponent,
    NewPasswordComponent,
    NewPassAccessComponent,
    MainPageComponent,
    RouterModule,
    DonationComponent,
    CommentDonationComponent,
    CommentDescriptionAccessComponent,
    WithoutCommentDonationAccessComponent,
    DetailsComponent,
    GeneralComponent,
    RequisitesComponent,
    RewardsComponent,
    TeamComponent,
    UploadsComponent,
    UploadsAccessComponent,
    SeeProjectPageComponent,
    CollectionClosedNiceComponent,
    BadCollectionClosedComponent,
    ProjectStatisticsComponent,
    ErrorPageComponent,
    AccountSettingsComponent,
    DisplayedAchievementsComponent,
    ProfileComponent,
    AnotherProfileComponent,
    AuthorProfileComponent,
    AnotherAuthorProfileComponent,
    ReachAchievementComponent,
    SupportComponent,
    SearchResultComponent,
    SendRequestComponent,
    FAQComponent,
    AccompanimentComponent,
    SpecialistHelpComponent,
    ExpertsComponent,
    LegalAndFinancialServicesComponent,
    ReadMoreComponent,
    MarketingComponent,
    MarketingFormComponent,
    MarketingAccessComponent,
    SeminarComponent,
    BlogComponent,
    State2Component,
    StateStartUpComponent,
    SeminarsVebinarsComponent,
    Seminar2Component,
    SeminarSecondComponent,
    SeminarThirdComponent,
    SeminarThirdComponent,
    ShopMainPageComponent,
    ProjectsListComponent,
    AboutUsComponent,
    RolePageComponent,
    TovarPageComponent,
    TovarPage2Component,
    EndTovarPageComponent,
    BasketComponent,
    ProductRegistrationComponent,
    ShopSuccessComponent,
    CookieRoolsComponent,
    AllCardsComponent,
    PolicyComponent,
    UsingRoolsComponent,
    ContactAuthorComponent,
    BecamingAuthorComponent,
    ChatComponent,
    AllChatsComponent,
    MaxProjectsComponent,
    RootPanelComponent,
    RootAccountsComponent,
    RootShopTovarsComponent
],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  translocoService = inject(TranslocoService);
  constructor(private languageService: LanguageService) {
    console.log('constructor');
  }

  switchLanguage(language: string) {
    this.languageService.switchLanguage(language);
  }
}
