export const MESSAGES = {
  auth: {
    login: {
      title: "Вход",
      emailLabel: "Email",
      passwordLabel: "Пароль",
      submit: "Войти",
      submitting: "Входим…",
      noAccount: "Нет аккаунта?",
      registerLink: "Зарегистрироваться",
      invalidCredentials: "Неверный email или пароль",
    },
    register: {
      title: "Регистрация",
      clientTileTitle: "Я ищу тренера",
      clientTileDescription: "Бронируйте занятия с проверенными тренерами",
      trainerTileTitle: "Я тренер",
      trainerTileDescription: "Скоро — регистрация тренера на отдельном этапе",
      fullNameLabel: "Имя",
      emailLabel: "Email",
      passwordLabel: "Пароль",
      confirmPasswordLabel: "Подтверждение пароля",
      termsLabel: "Принимаю условия использования",
      submit: "Зарегистрироваться",
      submitting: "Регистрируем…",
      hasAccount: "Уже есть аккаунт?",
      loginLink: "Войти",
      duplicateEmail: "Этот email уже зарегистрирован",
      termsRequired: "Примите условия использования",
      passwordMismatch: "Пароли не совпадают",
      validationError: "Проверьте правильность заполнения полей",
    },
  },
  site: {
    title: "Pulse — маркетплейс фитнес-тренеров",
    description:
      "Найдите проверенного тренера, забронируйте занятие и следите за прогрессом.",
    logoLabel: "Pulse",
  },
  nav: {
    client: {
      home: "Главная",
      trainers: "Тренеры",
      sessions: "Занятия",
      profile: "Профиль",
    },
    trainer: {
      today: "Сегодня",
      schedule: "Расписание",
      services: "Услуги",
      clients: "Клиенты",
      income: "Доход",
    },
    admin: {
      overview: "Обзор",
      trainers: "Тренеры",
      complaints: "Жалобы",
      refunds: "Возвраты",
      reviews: "Отзывы",
    },
  },
  shell: {
    sectionClient: "Клиент",
    sectionTrainer: "Тренер",
    sectionAdmin: "Администратор",
    notifications: "Уведомления",
    notificationsEmpty: "Нет новых уведомлений",
    signOut: "Выйти",
    signOutPending: "Выходим…",
    login: "Войти",
    register: "Регистрация",
    back: "Назад",
    bookingStep: "Шаг {step} из {total}",
    sessionTitle: "Сессия",
  },
  empty: {
    clientDashboard: {
      title: "Пока нет занятий",
      description:
        "Найдите тренера и забронируйте первое занятие — оно появится здесь.",
      cta: "Найти тренера",
    },
    trainerDashboard: {
      title: "Расписание пусто",
      description:
        "Настройте профиль и услуги — клиенты смогут записываться к вам.",
      cta: "Открыть профиль",
    },
    adminDashboard: {
      title: "Очередь пуста",
      description: "Новые заявки и жалобы появятся здесь, когда поступят.",
      cta: "Открыть очередь",
    },
  },
  landing: {
    meta: {
      title: "Pulse — маркетплейс фитнес-тренеров",
      description:
        "Проверенные тренеры, удобное бронирование и прозрачное расписание в одном месте.",
    },
    headline: "Ваш персональный фитнес — рядом",
    subcopy:
      "Проверенные тренеры, удобное бронирование и прозрачное расписание в одном месте.",
    primaryCta: "Найти тренера",
    secondaryCta: "Стать тренером",
    valueProps: {
      title: "Почему Pulse",
      items: [
        {
          title: "Проверенные тренеры",
          description:
            "Каждый профиль проходит модерацию — в каталоге только одобренные специалисты.",
        },
        {
          title: "Удобное бронирование",
          description:
            "Выбирайте услугу и свободный слот без звонков и переписки в мессенджерах.",
        },
        {
          title: "Прозрачное расписание",
          description:
            "Актуальные слоты и статусы занятий — всё в одном личном кабинете.",
        },
      ],
    },
    categories: {
      title: "Популярные направления",
      items: [
        { slug: "yoga", label: "Йога" },
        { slug: "pilates", label: "Пилатес" },
        { slug: "strength", label: "Силовые" },
        { slug: "hiit", label: "HIIT" },
        { slug: "stretching", label: "Стretching" },
      ],
    },
    featured: {
      title: "Лучшие тренеры",
      actionLabel: "Все",
      verifiedBadge: "Проверен",
      reviewsLabel: "отзывов",
      fromPriceLabel: "от",
      empty: {
        title: "Скоро появятся тренеры",
        description:
          "Мы готовим каталог проверенных специалистов. А пока загляните в полный список.",
        cta: "Открыть каталог",
      },
      error: {
        title: "Не удалось загрузить тренеров",
        description: "Проверьте подключение и попробуйте снова.",
        retry: "Повторить",
        retrying: "Загружаем…",
      },
    },
    footer: {
      tagline: "Pulse — маркетплейс фитнес-тренеров",
      navLabel: "Ссылки в подвале",
      login: "Войти",
      register: "Регистрация",
      privacy: "Конфиденциальность (скоро)",
      terms: "Условия (скоро)",
    },
  },
  toast: {
    saved: "Изменения сохранены",
    error: "Не удалось выполнить действие",
  },
  trainerReviewBanner: {
    title: "Профиль на проверке",
    description:
      "Модераторы проверяют ваш профиль. После одобрения он станет доступен клиентам.",
  },
  notFound: {
    title: "Страница не найдена",
    description: "Запрашиваемая страница не существует или была перемещена.",
    homeCta: "На главную",
  },
  placeholders: {
    pageStub: "Раздел в разработке — полный функционал появится в следующих фазах.",
    trainerProfile: "Профиль тренера",
    bookingWizard: "Мастер бронирования — скоро в P07.",
    bookingConfirm: "Подтверждение бронирования — скоро в P07.",
    sessionVideo:
      "Видеосессия будет доступна после интеграции Daily.co (post-MVP).",
  },
  dashboard: {
    clientTitle: "Главная",
    trainerTitle: "Сегодня",
    adminTitle: "Обзор",
  },
} as const;

export type Messages = typeof MESSAGES;
