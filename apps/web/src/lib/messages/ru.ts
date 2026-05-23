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
  dashboard: {
    clientStub: "Добро пожаловать! Личный кабинет клиента — скоро в P03.",
    trainerStub: "Добро пожаловать! Кабинет тренера — скоро в P03.",
    adminStub: "Панель администратора — скоро в P03.",
  },
} as const;

export type Messages = typeof MESSAGES;
