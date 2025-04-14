import { CommonModule, NgFor, NgIf } from '@angular/common';
import {
  Component,
  ElementRef,
  HostListener,
  importProvidersFrom,
  OnInit,
} from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { RouterModule } from '@angular/router';
import { TranslocoModule } from '@jsverse/transloco';
import { LanguageService } from '../services/language.service';

@Component({
  selector: 'app-all-cards',
  standalone: true,
  imports: [
    MatSelectModule,
    FormsModule,
    CommonModule,
    MatSlideToggleModule,
    MatCheckboxModule,
    MatFormFieldModule,
    NgFor,
    ReactiveFormsModule,
    RouterModule,
    TranslocoModule,
],

  templateUrl: './all-cards.component.html',
  styleUrl: './all-cards.component.scss',
})

export class AllCardsComponent 
{
[x: string]: any;

  
  onKvadratClick(event: Event)
  {
    const clickedElement = event.target as HTMLElement;
  
    // Убираем класс "highlighted" с всех изображений
    const allKvadratImages = document.querySelectorAll('img[src="assets/images/Kvadrat.png"]');
    allKvadratImages.forEach((img: any) => img.classList.remove('highlighted'));
  
    // Добавляем класс "highlighted" к текущему изображению
    clickedElement.classList.add('highlighted');
  }


  private hideHeight = 900;

  someString:string = 'UA';

onLanguageChange(event: any) 
{
  const selectedLang = event.value;
  if (selectedLang === 'ua') 
    {
    this.switchLanguage('en');
    this.someString = 'EN';
  } 
  else if (selectedLang === 'en') 
  {
    this.switchLanguage('uk');
    this.someString = 'UA';
  }
}

  selectedLanguage = new FormControl('ua');

  ngOnInit() 
  {
    this.onLanguageChange({ value: this.selectedLanguage.value });

     // Скрыть элементы сразу при загрузке страницы, независимо от скролла
  const sidebar = this.elRef.nativeElement.querySelector('.sidebar');
  if (sidebar) {
    sidebar.classList.add('hidden');
  }

  // Вызовем updateSidebarVisibility, чтобы учесть текущее положение скролла
  this.updateSidebarVisibility();
  }

  constructor(private languageService: LanguageService, private elRef: ElementRef) {}

  @HostListener('window:scroll', [])
  onWindowScroll() 
  {
    this.updateSidebarVisibility();
  }

  private updateSidebarVisibility() {
    const sidebar = this.elRef.nativeElement.querySelector('.sidebar');

    if (sidebar) 
      {
      const scrollY = window.scrollY;

      if (scrollY < this.hideHeight) 
        {
        sidebar.classList.add('hidden'); // Добавляем класс для скрытия
      } else {
        sidebar.classList.remove('hidden'); // Убираем класс, если поднялись выше
      }
    }
  }

  switchLanguage(language: string) 
  {
    this.languageService.switchLanguage(language);
  }

  languages = [
    { code: 'en', name: 'EN' },
    { code: 'ua', name: 'UA' },
  ];

  submitProject() {
    alert('Форма подачи проекта открыта!');
  }

  images: string[] = [
    'assets/images/photo1.png',
    'assets/images/photo2.png',
    'assets/images/photo3.jpg',
  ];

  currentIndex: number = 0;

  collectedMoney: number = 135420;
  targetMoney: number = 500000;

  description: string =
    'Багато людей сьогодні потерпають від наслідків війни. Ця ініціатива покликана допомогти людям із ПТСР, військовим та їхнім родинам, або будь-кому, хто потребує тиші та миру. Хатинка на березі гірського озера саме те місце, де можна віднайти себе.';

  get progressPercentage(): number {
    return (this.collectedMoney / this.targetMoney) * 100;
  }

  previousImage() {
    this.currentIndex =
      this.currentIndex === 0 ? this.images.length - 1 : this.currentIndex - 1;
  }

  nextImage() {
    this.currentIndex =
      this.currentIndex === this.images.length - 1 ? 0 : this.currentIndex + 1;
  }

  supportProject() {
    console.log('Проект поддержан!');
  }

  partnerLogos = [
    { src: 'assets/images/workua.png', alt: 'WORK.ua' },
    { src: 'assets/images/psbusinessparks.png', alt: 'PS Business Parks' },
    { src: 'assets/images/monobank.png', alt: 'Monobank' },
    { src: 'assets/images/forbes.png', alt: 'Forbes' },
    { src: 'assets/images/linkedin.png', alt: 'LinkedIn' },
    { src: 'assets/images/sportmaster.png', alt: 'Спортмастер' },
  ];

  investors = [
    { rank: 1, name: 'Прізвище Ім’я', photo: 'assets/images/investor1.png' },
    { rank: 2, name: 'Прізвище Ім’я', photo: 'assets/images/investor2.png' },
    { rank: 3, name: 'Прізвище Ім’я', photo: 'assets/images/investor3.png' },
    { rank: 4, name: 'Прізвище Ім’я', photo: 'assets/images/investor4.png' },
    { rank: 5, name: 'Прізвище Ім’я', photo: 'assets/images/investor5.webp' },
    { rank: 6, name: 'Прізвище Ім’я', photo: 'assets/images/investor6.png' },
    { rank: 7, name: 'Прізвище Ім’я', photo: 'assets/images/investor7.jpeg' },
    { rank: 8, name: 'Прізвище Ім’я', photo: 'assets/images/investor8.png' },
    { rank: 9, name: 'Прізвище Ім’я', photo: 'assets/images/investor9.png' },
    { rank: 10, name: 'Прізвище Ім’я', photo: 'assets/images/investor10.jpeg' },
  ];

  blogPosts = [
    {
      title: 'Кредит чи лізинг',
      image: 'assets/images/credit.png',
      description:
        'Вибір між кредитом і лізингом залежить від вашої фінансової ситуації, потреб і планів на майбутнє...',
    },
    {
      title: 'Інвестиційні можливості в Україні сьогодні',
      image: 'assets/images/investments.png',
      description:
        'Вибір між кредитом і лізингом залежить від вашої фінансової ситуації, потреб і планів на майбутнє...',
    },
    {
      title: 'Жінки в бізнесі в країнах Середньої Азії',
      image: 'assets/images/womenBusiness.png',
      description:
        'Жінки у бізнесі в Середній Азії стикаються як з можливостями, так і з викликами...',
    },
    {
      title: 'Стартапи України',
      image: 'assets/images/startups.png',
      description:
        'Вибір між кредитом і лізингом залежить від вашої фінансової ситуації, потреб і планів на майбутнє...',
    },
    {
      title: 'Карпатський ліс',
      image: 'assets/images/forest.png',
      description:
        'Карпатський ліс - це важлива природна система, яка охоплює величезні території в горах Карпат, які розташовані в кількох...',
    },
    {
      title: 'Венчурний капітал',
      image: 'assets/images/ventureCapital.png',
      description:
        'Реалізація венчурного капіталу - це складний процес, який включає кілька етапів, від збору коштів до оцінки...',
    },
  ];

  projects = [
    {
      title: 'ПЕКАРНЯ «НА РОЗІ»',
      image: 'assets/images/credit.png',
      closingDate: '21.01.2025',
      participants: 187,
      amount: 508251,
      percentage: 103,
    },
    {
      title: '«ЗЕРНО НАДІЇ»',
      image: 'assets/images/investments.png',
      closingDate: '21.01.2025',
      participants: 187,
      amount: 508251,
      percentage: 103,
    },
    {
      title: 'ШКОЛА ТАНЦІВ',
      image: 'assets/images/womenBusiness.png',
      closingDate: '21.01.2025',
      participants: 187,
      amount: 508251,
      percentage: 103,
    },
    {
      title: 'НОВИЙ ПРОЄКТ',
      image: 'assets/images/startups.png',
      closingDate: '21.01.2025',
      participants: 187,
      amount: 508251,
      percentage: 103,
    },
    {
      title: 'РЕСТОРАН',
      image: 'assets/images/ventureCapital.png',
      closingDate: '21.01.2025',
      participants: 187,
      amount: 508251,
      percentage: 103,
    },
  ];

  currentInd = 0;
  visibleItems = 3;


  nextSlide() {
    if (this.currentIndex < this.projects.length - this.visibleItems) {
      this.currentIndex++;
    } else {
      this.currentIndex = 0;
    }
  }

  prevSlide() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    } else {
      this.currentIndex = this.projects.length - this.visibleItems;
    }
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  isLiked: boolean = false;

  toggleLikeFirst() {
    this.isLiked = !this.isLiked;
  }

  goToImage(index: number) {
    this.currentIndex = index;
  }

  projects2 = [
    {
      title: 'Кафе «Коло мене»',
      image: 'assets/images/ventureCapital.png',
      amountRaised: 135420,
      goal: 500000,
      progress: this.getProgress,
    },
    {
      title: 'Врятуймо степову лисицю',
      image: 'assets/images/womenBusiness.png',
      amountRaised: 135420,
      goal: 500000,
      progress: this.getProgress,
    },
    {
      title: 'Зливи не вщухають',
      image: 'assets/images/startups.png',
      amountRaised: 135420,
      goal: 500000,
      progress: this.getProgress,
    },
    {
      title: 'Кафе «Коло мене»',
      image: 'assets/images/ventureCapital.png',
      amountRaised: 135420,
      goal: 500000,
      progress: this.getProgress,
    },
    {
      title: 'Врятуймо степову лисицю',
      image: 'assets/images/womenBusiness.png',
      amountRaised: 135420,
      goal: 500000,
      progress: this.getProgress,
    },
    {
      title: 'Зливи не вщухають',
      image: 'assets/images/startups.png',
      amountRaised: 135420,
      goal: 500000,
      progress: this.getProgress,
    },
  ];

  likedProjects: boolean[] = new Array(this.projects2.length).fill(false);

  toggleLike(index: number): void {
    this.likedProjects[index] = !this.likedProjects[index];
  }

  getProgress(project: any) {
    return (project.amountRaised / project.goal) * 100 + '%';
  }

  scrollToSection() {
    const element = document.getElementById('targetSection');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  scrollToSection2() {
    const element = document.getElementById('targetSection2');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  scrollToSection3() {
    const element = document.getElementById('targetSection3');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }


//-----------------------------------------------


progress = (25650 / 200000) * 100;

showDescription(index: number) {
  this.cards[index].isHovered = true;
}

hideDescription(index: number) {
  this.cards[index].isHovered = false;
}

// -----------------------------

//-- пробелы после тысяч
formatNumber(value: number): string { 
  return value.toLocaleString('en').replace(/,/g, ' ');
}
//-- запятая вместо точки в десятичных числах
formatDecimal(value: number): string {
  return value.toString().replace('.', ',');
}

  cards = [
    {
      img: "assets/images/стартап-освіта.png",
      title: "Портал «GlobalEdu»",
      startSum: 25650,
      endSum: 200000,
      folowers: 38,
      daysToEnd: 56,
      moneyColected: 12.8,
      description: "Освітній портал для дітей з усіх куточків світу. Проект «GlobalEdu» має на меті створення інтерактивного онлайн-порталу, який надає безкоштовний доступ до освітніх ресурсів ...",
      isHovered: false,
      isLiked: false,
      isShared: false,
      isSupported: false
    },

    {
      img: "assets/images/екодослідники1.png",
      title: "«Екодослідники»",
      startSum: 25650,
      endSum: 200000,
      folowers: 38,
      daysToEnd: 56,
      moneyColected: 12.8,
      description: "Проєкт, що передбачає проведення екологічних експедицій для школярів, де вони можуть вивчати екосистеми в своїх регіонах та брати участь у дослідженнях. Діти навчатимуться обирати...",
      isHovered: false,
      isLiked: false,
      isShared: false,
      isSupported: false
    },

    {
      img: "assets/images/библиотека на колесах3.png",
      title: "«Бібліотека на колесах»",
      startSum: 25650,
      endSum: 200000,
      folowers: 38,
      daysToEnd: 56,
      moneyColected: 12.8,
      description: "Створення мобільної бібліотеки, яка доставляє книги і навчальні матеріали в віддалені чи малозабезпечені райони. Бібліотека може проводити заходи, читання книг, майстер-к...",
      isHovered: false,
      isLiked: false,
      isShared: false,
      isSupported: false
    },

    {
      img: "assets/images/културний фестиваль1.png",
      title: "Фестиваль «Культфест»",
      startSum: 25650,
      endSum: 200000,
      folowers: 38,
      daysToEnd: 56,
      moneyColected: 12.8,
      description: `Проєкт "Фестиваль місцевих талантів" спрямований на організацію масштабного культурного святкування, яке підкреслить творчість та різноманітність місцевих художників...`,
      isHovered: false,
      isLiked: false,
      isShared: false,
      isSupported: false
    },

    {
      img: "assets/images/музей истории2.png",
      title: "«Інтерактивна історія»",
      startSum: 25650,
      endSum: 200000,
      folowers: 38,
      daysToEnd: 56,
      moneyColected: 12.8,
      description: `Створення інтерактивного музею, де можна буде дізнатися про історію та культуру певного регіону через сучасні технології, такі як віртуальна реальність. Відвідувачі зможуть зануритися...`,
      isHovered: false,
      isLiked: false,
      isShared: false,
      isSupported: false
    },

    {
      img: "assets/images/хатинка2.png",
      title: "Хатинка в горах",
      startSum: 25650,
      endSum: 200000,
      folowers: 38,
      daysToEnd: 56,
      moneyColected: 12.8,
      description: `Багато людей сьогодні потерпають від наслідків війни. Ця ініціатива покликана допомогти людям із ПТСР, військовим та їхнім родинам, або будь-кому, хто потребує тиші та миру. Хатинка на березі...`,
      isHovered: false,
      isLiked: false,
      isShared: false,
      isSupported: false
    },

    {
      img: "assets/images/телемедицина3.png",
      title: "Портал «Телемед»",
      startSum: 215780,
      endSum: 300000,
      folowers: 87,
      daysToEnd: 41,
      moneyColected: 72,
      description: `У сучасному світі доступ до медичних послуг є критично важливим, особливо для тих, хто не має змоги відвідувати лікаря особисто (люди з фізичними обмеженнями, мешканці...`,
      isHovered: false,
      isLiked: false,
      isShared: false,
      isSupported: false
    },

    {
      img: "assets/images/моніторинг здоров'я1.png",
      title: "Портал «CheckHealth»",
      startSum: 215780,
      endSum: 450000,
      folowers: 90,
      daysToEnd: 35,
      moneyColected: 47,
      description: `Сучасні технології відіграють важливу роль у моніторингу здоров'я та профілактиці захворювань. Стартап пропонує створення мобільної платформи, що поєднує у собі...`,
      isHovered: false,
      isLiked: false,
      isShared: false,
      isSupported: false
    },

    {
      img: "assets/images/Харчування1.png",
      title: "Додаток «HealthyPlate»",
      startSum: 215780,
      endSum: 450000,
      folowers: 98,
      daysToEnd: 35,
      moneyColected: 47,
      description: `Healthy Plate — це мобільний додаток, який допомагає користувачам планувати свої прийоми їжі, підбирати рецепти на основі наявних продуктів і отримувати рекомендації щодо здорового...`,
      isHovered: false,
      isLiked: false,
      isShared: false,
      isSupported: false
    },

    {
      img: "assets/images/Сади для всех1.png",
      title: "«Сади для всіх»",
      startSum: 215780,
      endSum: 450000,
      folowers: 341,
      daysToEnd: 20,
      moneyColected: 86.3,
      description: `Сади для всіх — це ініціатива, яка прагне створити громаду в рамках міського середовища, де кожен має можливість вирощувати свої овочі та фрукти, навчатися еко-фермерству та обмінюватися...`,
      isHovered: false,
      isLiked: false,
      isShared: false,
      isSupported: false
    },

    {
      img: "assets/images/экобус1.png",
      title: "«Еко-бус»",
      startSum: 215780,
      endSum: 450000,
      folowers: 46,
      daysToEnd: 73,
      moneyColected: 15.4,
      description: `Еко-Бус — це інноваційна ініціатива, метою якої є створення автобусного маршруту з використанням екологічно чистих автобусів, таких як електричні або на біопаливі. Ми хочемо забезпечити...`,
      isHovered: false,
      isLiked: false,
      isShared: false,
      isSupported: false
    },

    {
      img: "assets/images/спільні поїздки1.png",
      title: "Платформа «EcoRide»",
      startSum: 215780,
      endSum: 450000,
      folowers: 37,
      daysToEnd: 96,
      moneyColected: 11.2,
      description: `EcoRide — це революційна онлайн-платформа та мобільний додаток, який об'єднує водіїв, що бажають поділитися своїми поїздками, з пасажирами, яким потрібен зручний і...`,
      isHovered: false,
      isLiked: false,
      isShared: false,
      isSupported: false
    },

    {
      img: "assets/images/музика4.png",
      title: "«Музичний Кросворд»",
      startSum: 215780,
      endSum: 450000,
      folowers: 87,
      daysToEnd: 54,
      moneyColected: 55,
      description: `Музичний Кросворд — це унікальний документальний відео-серіал, що розкриває багатогранний світ музики, її жанрів, історії та культури. Ми плануємо дослідити вплив...`,
      isHovered: false,
      isLiked: false,
      isShared: false,
      isSupported: false
    },

    {
      img: "assets/images/читацький додаток4.png",
      title: "Читай із BookNest",
      startSum: 11000,
      endSum: 300000,
      folowers: 87,
      daysToEnd: 54,
      moneyColected: 32,
      description: `BookNest — це інноваційний мобільний додаток, розроблений спеціально для читачів, який об'єднує в собі можливості соціальної мережі, платформи для обміну книгами та інс...`,
      isHovered: false,
      isLiked: false,
      isShared: false,
      isSupported: false
    },

    {
      img: "assets/images/сучукрпоезия1.png",
      title: "Антологія сучасної поезії",
      startSum: 11000,
      endSum: 300000,
      folowers: 87,
      daysToEnd: 54,
      moneyColected: 32,
      description: `Антологія сучасної української поезії — це амбітний проєкт, направлений на створення унікальної збірки творів сучасних українських поетів, який охоплює різні стилі, теми та голоси...`,
      isHovered: false,
      isLiked: false,
      isShared: false,
      isSupported: false
    },

    {
      img: "assets/images/пошив одягу4.png",
      title: "Майстерня «Ґудзик»",
      startSum: 22500,
      endSum: 400000,
      folowers: 78,
      daysToEnd: 86,
      moneyColected: 2.7,
      description: `Проєкт передбачає створення колекції одягу для осіб, постраждалих від воєнних дій, з акцентом на забезпечення високої якості та доступності за зниженими цінами. В рамках ініціативи буде...`,
      isHovered: false,
      isLiked: false,
      isShared: false,
      isSupported: false
    },

    {
      img: "assets/images/новини2.png",
      title: "Портал «Голос Регіонів»",
      startSum: 22500,
      endSum: 400000,
      folowers: 147,
      daysToEnd: 52,
      moneyColected: 50,
      description: `«Голос Регіонів» — це інноваційна онлайн-платформа, створена для того, щоб дати голос мешканцям малих міст і сіл України, які часто залишаються поза увагою традиційних засобів...`,
      isHovered: false,
      isLiked: false,
      isShared: false,
      isSupported: false
    },

    {
      img: "assets/images/классика дети3.png",
      title: "Класика для дітей",
      startSum: 22500,
      endSum: 400000,
      folowers: 143,
      daysToEnd: 91,
      moneyColected: 7.7,
      description: `Проект має на меті створення інтерактивної платформи, де діти зможуть вивчати класичну музику через ігри, анімації та цікаві історії про композиторів. Платформа стане містком...`,
      isHovered: false,
      isLiked: false,
      isShared: false,
      isSupported: false
    },

    {
      img: "assets/images/читання разом5.png",
      title: "Читання разом",
      startSum: 75700,
      endSum: 800000,
      folowers: 587,
      daysToEnd: 13,
      moneyColected: 94.7,
      description: `Цей проект спрямований на організацію читацьких програм для дітей у місцевих бібліотеках та школах, де волонтери читають дітям книги та проводять творчі заняття. Мета...`,
      isHovered: false,
      isLiked: false,
      isShared: false,
      isSupported: false
    },

    {
      img: "assets/images/дети рисуют1.png",
      title: "Майстерня малювання",
      startSum: 456080,
      endSum: 1200000,
      folowers: 214,
      daysToEnd: 61,
      moneyColected: 38,
      description: `Проект передбачає організацію безкоштовних художніх майстер-класів для дітей у місцевих громадах, зокрема для дітей з малозабезпечених сімей. Мета – розвивати їхню креативність і...`,
      isHovered: false,
      isLiked: false,
      isShared: false,
      isSupported: false
    },

    {
      img: "assets/images/рослини2.png",
      title: "Система «SmartGarden»",
      startSum: 456080,
      endSum: 1000000,
      folowers: 514,
      daysToEnd: 44,
      moneyColected: 47,
      description: `«SmartGarden» – це інноваційна система для домашнього вирощування рослин, яка використовує датчики та мобільний додаток для моніторингу та управління умовами росту...`,
      isHovered: false,
      isLiked: false,
      isShared: false,
      isSupported: false
    },

    {
      img: "assets/images/Rectangle 74.png",
      title: "Школа без меж",
      startSum: 13290,
      endSum: 3000000,
      folowers: 78,
      daysToEnd: 90,
      moneyColected: 0.4,
      description: `Цей проєкт спрямований на створення школи нового покоління, де освіта стане інтерактивною, захопливою та доступною. Замість традиційних підручників діти використову...`,
      isHovered: false,
      isLiked: false,
      isShared: false,
      isSupported: false
    },

    {
      img: "assets/images/Rectangle 75.png",
      title: "Mobile Learning",
      startSum: 140900,
      endSum: 2000000,
      folowers: 170,
      daysToEnd: 84,
      moneyColected: 7.5,
      description: `Проєкт передбачає створення мобільних освітніх хабів — обладнаних автобусів, які будуть подорожувати віддаленими населеними пунктами та надавати дітям доступ до сучас...`,
      isHovered: false,
      isLiked: false,
      isShared: false,
      isSupported: false
    },

    {
      img: "assets/images/Rectangle 76.png",
      title: "ProScience Lab",
      startSum: 500000,
      endSum: 2000000,
      folowers: 709,
      daysToEnd: 81,
      moneyColected: 25,
      description: `Цей проєкт спрямований на створення незалежної науково-дослідної лабораторії ‘’ProScience Lab’’, яка стане майданчиком для інновацій, експериментів і відкриттів. Ми хочемо дати мож....`,
      isHovered: false,
      isLiked: false,
      isShared: false,
      isSupported: false
    },

    {
      img: "assets/images/Rectangle 77.png",
      title: "Фонд Young scientist",
      startSum: 317010,
      endSum: 900000,
      folowers: 109,
      daysToEnd: 81,
      moneyColected: 35.2,
      description: `Ми хочемо створити альтернативу міжнародним грантам, які часто недоступні для початківців. Фонд зможе підтримати перспективні наукові ідеї у сферах екології, медицини...`,
      isHovered: false,
      isLiked: false,
      isShared: false,
      isSupported: false
    },

    {
      img: "assets/images/Rectangle 78.png",
      title: "Відновлення пам’яток",
      startSum: 115472,
      endSum: 600000,
      folowers: 98,
      daysToEnd: 55,
      moneyColected: 19.2,
      description: `З кожним роком ми втрачаємо все більше історичних будівель, скульптур та інших культурних пам’яток, які є частиною нашої національної спадщини. Цей проєкт спрямо...`,
      isHovered: false,
      isLiked: false,
      isShared: false,
      isSupported: false
    },

    {
      img: "assets/images/Rectangle 79.png",
      title: "Розфарбуй своє місто",
      startSum: 72631,
      endSum: 500000,
      folowers: 74,
      daysToEnd: 80,
      moneyColected: 14.5,
      description: `Сірі та одноманітні стіни міських будівель можуть стати полотнами для сучасного мистецтва. Проєкт покликаний зробити українські міста яскравішими за допомогою муралів, арт-об’єктів...`,
      isHovered: false,
      isLiked: false,
      isShared: false,
      isSupported: false
    },

    {
      img: "assets/images/Rectangle 80.png",
      title: `Театр "Світло і Тінь"`,
      startSum: 13578,
      endSum: 500000,
      folowers: 78,
      daysToEnd: 86,
      moneyColected: 2.7,
      description: `В Україні безліч талановитих акторів, режисерів та сценаристів, які мріють ставити експериментальні вистави, але стикаються з браком фінансування. Ми створюємо незалежний...`,
      isHovered: false,
      isLiked: false,
      isShared: false,
      isSupported: false
    },

    {
      img: "assets/images/Rectangle 81.png",
      title: `Музей сучасного мист...`,
      startSum: 1380000,
      endSum: 4500000,
      folowers: 78,
      daysToEnd: 86,
      moneyColected: 31,
      description: `Сучасне мистецтво має бути доступним кожному, а не лише в стінах галерей. Ми створюємо унікальний музей просто неба, де експонатами стануть великі арт-інсталяції, інтера...`,
      isHovered: false,
      isLiked: false,
      isShared: false,
      isSupported: false
    },

    {
      img: "assets/images/Rectangle 82.png",
      title: `Майстерні для художників`,
      startSum: 820000,
      endSum: 2300000,
      folowers: 48,
      daysToEnd: 36,
      moneyColected: 26,
      description: `В Україні багато талановитих митців, але мало місць, де вони можуть працювати та розвиватися. Ми створюємо відкритий арт-простір — майстерні, де художники зможуть безкош...`,
      isHovered: false,
      isLiked: false,
      isShared: false,
      isSupported: false
    },

    {
      img: "assets/images/Rectangle 83.png",
      title: `ProScience Lab`,
      startSum: 490000,
      endSum: 1200000,
      folowers: 67,
      daysToEnd: 51,
      moneyColected: 41,
      description: `У багатьох українських селах бракує лікарів і навіть базової медичної допомоги. Ми створюємо мобільні медичні бригади, які регулярно виїжджатимуть у віддалені нас...`,
      isHovered: false,
      isLiked: false,
      isShared: false,
      isSupported: false
    },

    {
      img: "assets/images/Rectangle 84.png",
      title: `Безкоштовні слухові апарати`,
      startSum: 320000,
      endSum: 8500000,
      folowers: 78,
      daysToEnd: 86,
      moneyColected: 38,
      description: `У багатьох українських селах бракує лікарів і навіть базової медичної допомоги. Ми створюємо мобільні медичні бригади, які регулярно виїжджатимуть у віддалені нас...`,
      isHovered: false,
      isLiked: false,
      isShared: false,
      isSupported: false
    },

    {
      img: "assets/images/Rectangle 85.png",
      title: `Підтримка ветеранів`,
      startSum: 501570,
      endSum: 1000000,
      folowers: 78,
      daysToEnd: 86,
      moneyColected: 50.5,
      description: `Цей проект спрямований на надання психологічної підтримки та реабілітації ветеранам, які повернулися з війни. Ініціатива включає організацію групових та індив...`,
      isHovered: false,
      isLiked: false,
      isShared: false,
      isSupported: false
    },

    {
      img: "assets/images/Rectangle 86.png",
      title: `Мед. забеспечення армії`,
      startSum: 5480570,
      endSum: 5000000,
      folowers: 985,
      daysToEnd: 52,
      moneyColected: 109.6,
      description: `Проект фокусується на зборі коштів для закупівлі медичних засобів, обладнання та медикаментів для військових підрозділів, які беруть участь у бойових діях. Ця ініціатива спря...`,
      isHovered: false,
      isLiked: false,
      isShared: false,
      isSupported: false
    },

    {
      img: "assets/images/повінь1.png",
      title: `Повінь. Відновлення`,
      startSum: 501570,
      endSum: 100000,
      folowers: 985,
      daysToEnd: 52,
      moneyColected: 109.6,
      description: `Цей проект має на меті надання термінової допомоги та ресурсів для відновлення життя в постраждалих районах після того, як стихійне лихо, таке як повінь, завдало шкоди домівкам...`,
      isHovered: false,
      isLiked: false,
      isShared: false,
      isSupported: false
    },

    {
      img: "assets/images/безпека2.png",
      title: `Безпека в промисловості`,
      startSum: 501570,
      endSum: 200000,
      folowers: 124,
      daysToEnd: 71,
      moneyColected: 26,
      description: `Проєкт «Безпека в промисловості» має на меті розробку та впровадження навчальних програм з безпеки для працівників промислових підприємств.`,
      isHovered: false,
      isLiked: false,
      isShared: false,
      isSupported: false
    },

    {
      img: "assets/images/числе довклілля4.png",
      title: `Числе довкілля України`,
      startSum: 501570,
      endSum: 1000000,
      folowers: 78,
      daysToEnd: 86,
      moneyColected: 50.5,
      description: `Цей проект має на меті створення мережі екологічних патрулів у різних регіонах України для боротьби зі сміттям і забрудненням. Волонтери будуть регулярно проводити акції очищення...`,
      isHovered: false,
      isLiked: false,
      isShared: false,
      isSupported: false
    },

    {
      img: "assets/images/агрокомплекс2.png",
      title: `Андріївський еко-сад`,
      startSum: 118540,
      endSum: 1200000,
      folowers: 317,
      daysToEnd: 25,
      moneyColected: 9.9,
      description: `Проект передбачає створення еко-саду в Києві на території навчального закладу або громадського простору. В еко-саді задіяні будуть принципи органічного землеробства, де діти і дорослі...`,
      isHovered: false,
      isLiked: false,
      isShared: false,
      isSupported: false
    },

    {
      img: "assets/images/водні справи3.png",
      title: `Водні справи`,
      startSum: 118540,
      endSum: 1200000,
      folowers: 548,
      daysToEnd: 0,
      moneyColected: 101,
      description: `Проект «Водні справи. Очистка річок України» спрямований на очищення річок і водойм в Україні від засмічення та шкідливих відходів. Залучення місцевих жителів до акцій з очищення не...`,
      isHovered: false,
      isLiked: false,
      isShared: false,
      isSupported: false
    },

  ];

// Открываем или закрываем блок
toggleShare(index: number, event: Event) {
  event.stopPropagation(); // Останавливаем всплытие, чтобы не закрывалось сразу
  this.cards[index].isShared = !this.cards[index].isShared;
}

// Останавливаем всплытие внутри блока
stopPropagation(event: Event) {
  event.stopPropagation();
}

// Закрываем при клике на документе
@HostListener('document:click', ['$event'])
closeShare(index: number) {
  if (this.cards[index].isShared) {
    this.cards[index].isShared = false;
  }
}

  // Получить процент заполненности
  getPercentage(startSum: number, endSum: number): number {
    return Math.min((startSum / endSum) * 100, 100);
  }
}

