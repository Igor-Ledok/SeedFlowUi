import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MainPageComponent } from './main-page/main-page.component';
import { RegistrationComponent } from './registration/registration.component';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { RegAccessComponent } from './reg-access/reg-access.component';
import { NewPassAccessComponent } from './new-pass-access/new-pass-access.component';
import { NewPasswordComponent } from './new-password/new-password.component';
import { DonationComponent } from './donation/donation.component';
import { CommentDonationComponent } from './comment-donation/comment-donation.component';
import { CommentDescriptionAccessComponent } from './comment-description-access/comment-description-access.component';
import { WithoutCommentDonationAccessComponent } from './without-comment-donation-access/without-comment-donation-access.component';
import { DetailsComponent } from './details/details.component';
import { GeneralComponent } from './general/general.component';
import { RequisitesComponent } from './requisites/requisites.component';
import { RewardsComponent } from './rewards/rewards.component';
import { TeamComponent } from './team/team.component';
import { UploadsComponent } from './uploads/uploads.component';
import { UploadsAccessComponent } from './uploads-access/uploads-access.component';
import { SeeProjectPageComponent } from './see-project-page/see-project-page.component';
import { CollectionClosedNiceComponent } from './collection-closed-nice/collection-closed-nice.component';
import { BadCollectionClosedComponent } from './bad-collection-closed/bad-collection-closed.component';
import { ProjectStatisticsComponent } from './project-statistics/project-statistics.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { DisplayedAchievementsComponent } from './displayed-achievements/displayed-achievements.component';
import { ProfileComponent } from './profile/profile.component';
import { AnotherProfileComponent } from './another-profile/another-profile.component';
import { AuthorProfileComponent } from './author-profile/author-profile.component';
import { AnotherAuthorProfileComponent } from './another-author-profile/another-author-profile.component';
import { ReachAchievementComponent } from './reach-achievement/reach-achievement.component';
import { SupportComponent } from './support/support.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { SendRequestComponent } from './send-request/send-request.component';
import { FAQComponent } from './faq/faq.component';
import { AccompanimentComponent } from './accompaniment/accompaniment.component';
import { SpecialistHelpComponent } from './specialist-help/specialist-help.component';
import { ExpertsComponent } from './experts/experts.component';
import { LegalAndFinancialServicesComponent } from './legal-and-financial-services/legal-and-financial-services.component';
import { ReadMoreComponent } from './read-more/read-more.component';
import { MarketingComponent } from './marketing/marketing.component';
import { MarketingFormComponent } from './marketing-form/marketing-form.component';
import { MarketingAccessComponent } from './marketing-access/marketing-access.component';
import { SeminarComponent } from './seminar/seminar.component';
import { BlogComponent } from './blog/blog.component';
import { State2Component } from './state2/state2.component';
import { StateStartUpComponent } from './state-start-up/state-start-up.component';
import { SeminarsVebinarsComponent } from './seminars-vebinars/seminars-vebinars.component';
import { Seminar2Component } from './seminar2/seminar2.component';
import { SeminarSecondComponent } from './seminar-second/seminar-second.component';
import { SeminarThirdComponent } from './seminar-third/seminar-third.component';
import { IsAutho } from './guards/is-author.guard';
import { ShopMainPageComponent } from './shop-main-page/shop-main-page.component';
import { ProjectsListComponent } from './projects-list/projects-list.component' ;
import { AboutUsComponent } from './about-us/about-us.component';
import { TovarPageComponent } from './tovar-page/tovar-page.component';
import { TovarPage2Component } from './tovar-page2/tovar-page2.component';
import { EndTovarPageComponent } from './end-tovar-page/end-tovar-page.component';
import { BasketComponent } from './basket/basket.component';
import { ProductRegistrationComponent } from './product-registration/product-registration.component';
import { ShopSuccessComponent } from './shop-success/shop-success.component';
import { CookieRoolsComponent } from './cookie-rools/cookie-rools.component';
import { PolicyComponent } from './policy/policy.component';
import { BecamingAuthorComponent } from './becaming-author/becaming-author.component';
import { LoginRedirectGuard } from './guards/login-redirect.guard';
import { ChatComponent } from './chat/chat.component';
import { AllChatsComponent } from './all-chats/all-chats.component';
import { UsingRoolsComponent } from './using-rools/using-rools.component';
import { MaxProjectsComponent } from './max-projects/max-projects.component';
import { RootPanelComponent } from './root-panel/root-panel.component';
import { RootAccountsComponent } from './root-accounts/root-accounts.component';
import { RootShopTovarsComponent } from './root-shop-tovars/root-shop-tovars.component';

export const routes: Routes =
 [
    { path: '', component: MainPageComponent },
    { path: 'login-page', component: LoginComponent },
    { path: 'registration-page', component: RegistrationComponent },
    { path: 'passwordReset-page', component: PasswordResetComponent },
    { path: 'loginAccess-page', component: RegAccessComponent },
    { path: 'newPasswordAccess-page', component: NewPassAccessComponent},
    { path: 'regAccess-page', component: RegAccessComponent},
    { path: 'newPassword-page', component: NewPasswordComponent},
    { path: 'donation-page', component: DonationComponent},
    { path: 'comment-donation-page', component: CommentDonationComponent},
    { path: 'comment-donation-access-page', component: CommentDescriptionAccessComponent},
    { path: 'without-comment-donation-access-page', component: WithoutCommentDonationAccessComponent},
    { path: 'detail-page', component: DetailsComponent, canActivate: [IsAutho]},
    { path: 'general-page', component: GeneralComponent, canActivate: [IsAutho]},
    { path: 'requisites-page', component: RequisitesComponent, canActivate: [IsAutho]},
    { path: 'rewards-page', component: RewardsComponent, canActivate: [IsAutho]},
    { path: 'team-page', component: TeamComponent, canActivate: [IsAutho]},
    { path: 'uploads-page', component: UploadsComponent, canActivate: [IsAutho]},
    { path: 'uploads-access-page', component: UploadsAccessComponent},
    { path: 'see-project-page', component: SeeProjectPageComponent},
    { path: 'collection-closed-nice-page', component: CollectionClosedNiceComponent},
    { path: 'bad-collection-closed-page', component: BadCollectionClosedComponent},
    { path: 'project-statistics-page', component: ProjectStatisticsComponent},
    { path: 'error-page', component: ErrorPageComponent, canActivate: [LoginRedirectGuard]},
    { path: 'account-settings-page', component: AccountSettingsComponent, canActivate: [LoginRedirectGuard]},
    { path: 'displayed-achievements-page', component: DisplayedAchievementsComponent},
    { path: 'profile-page', component: ProfileComponent},
    { path: 'another-profile-page', component: AnotherProfileComponent},
    { path: 'author-profile-page', component: AuthorProfileComponent},
    { path: 'another-author-profile-page', component: AnotherAuthorProfileComponent},
    { path: 'reach-achievement-page', component: ReachAchievementComponent},
    { path: 'support-page', component: SupportComponent},
    { path: 'search-result-page', component: SearchResultComponent},
    { path: 'send-request-page', component: SendRequestComponent},
    { path: 'faq-page', component: FAQComponent},
    { path: 'accompaniment-page', component: AccompanimentComponent},
    { path: 'specialist-help-page', component: SpecialistHelpComponent},
    { path: 'experts-page', component: ExpertsComponent},
    { path: 'legal-and-financial-services-page', component: LegalAndFinancialServicesComponent},
    { path: 'read-more-page', component: ReadMoreComponent},
    { path: 'marketing-page', component: MarketingComponent},
    { path: 'marketing-form-page', component: MarketingFormComponent},
    { path: 'marketing-access-page', component: MarketingAccessComponent},
    { path: 'seminar-page', component: SeminarComponent},
    { path: 'blog-page', component: BlogComponent},
    { path: 'state2-page', component: State2Component},
    { path: 'state-startup-page', component: StateStartUpComponent},
    { path: 'seminars-vebinars-page', component: SeminarsVebinarsComponent},
    { path: 'seminar2-page', component: Seminar2Component},
    { path: 'seminar-second-page', component: SeminarSecondComponent},
    { path: 'seminar-third-page', component: SeminarThirdComponent},
    { path: 'projects-list-page', component: ProjectsListComponent},
    { path: 'seminar-third-page', component: SeminarThirdComponent},
    { path: 'shop-main-page-page', component: ShopMainPageComponent, canActivate: [LoginRedirectGuard]},
    { path: 'about-us-page', component: AboutUsComponent},
    { path: 'tovar-page-page', component: TovarPageComponent, canActivate: [LoginRedirectGuard]},
    { path: 'tovar-page2-page', component: TovarPage2Component},
    { path: 'end-tovar-page', component: EndTovarPageComponent},
    { path: 'basket-page', component: BasketComponent, canActivate: [LoginRedirectGuard]},
    { path: 'product-registration-page', component: ProductRegistrationComponent},
    { path: 'shop-success-page', component: ShopSuccessComponent},
    { path: 'cookie-rools-page', component: CookieRoolsComponent},
    { path: 'policy-page', component: PolicyComponent},
    { path: 'using-rools-page', component: UsingRoolsComponent},
    { path: 'becaming-author-page', component: BecamingAuthorComponent},
    { path: 'chat-page', component: ChatComponent},
    { path: 'all-chats-page', component: AllChatsComponent},
    { path: 'max-projects-page', component: MaxProjectsComponent},
    { path: 'root-panel-page', component: RootPanelComponent},
    { path: 'root-accounts-page', component: RootAccountsComponent},
    { path: 'root-shop-tovars-page', component: RootShopTovarsComponent}
 
   ];
