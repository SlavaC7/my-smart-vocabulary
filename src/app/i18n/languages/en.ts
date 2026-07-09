export default {
  //Your translate strings
  app: { name: 'My smart vocabulary' },
  toasts: {
    success: 'Success!',
    error: 'Error!',
    ops: 'Ooops',
    exist_quiz: 'Complete an existing test first',
  },
  errors: {
    min: 'This field must be greater than {{value}}',
    max: 'This field must be less than {{value}}',
    email: 'Invalid email',
    phone: 'Invalid phone number',
    required: 'This field is required',
    number_in_use: 'The given phone number is already in use!',
    integer: 'This field must contain an integer numeric value',
  },
  inputs: {
    search: 'Search',
    name: 'Name',
    email: 'Email',
  },
  auth: {
    google: 'Continue with Google',
    apple: 'Continue with Apple',
    or: 'or',
    welcome: 'Welcome',
    phone_placeholder: 'Phone number',
    simple_auth: 'Complete a simple registration process',
  },
  profile: {
    total_words: 'Total Words',
    total_folders: 'Total Folders',
    menu: {
      change_profile: 'Change profile',
      about_app: 'About app',
      quiz_history: 'Quiz history',
    },
  },
  home: {
    title: 'Home',
  },
  search: {
    title: 'Search',
    placeholder: 'Type a word',
  },
  tests: {
    title: 'Tests',
    configuring: 'Configuring',
    ready_to_test: 'Ready to test your knowledge?',
    choose_mode: 'Choose a training mode',
    total_answers: 'Total answers',
    correct_answers: 'Correct answers',
    incorrect_answers: 'Incorrect answers',
    select_folders: 'Select a folders',
    count: 'Count',
    correctly: 'Correctly',
    modes: {
      config: {
        title: 'Configuring',
        description: 'Customize the test the way you want',
      },
      match: {
        title: 'Match',
        description: '10 tests to find matches',
      },
      writing: {
        title: 'Writing',
        description: '10 word spelling tests',
      },
      quick: {
        title: 'Quick',
        description: '10 randomly generated tests',
      },
    },
    active_test_found: 'Active test found',
  },
  common: {
    other: 'Other',
  },

  own_translation: {
    title: 'Own translation',
    create: 'Create own translation',
    description: 'Description',
    add: 'Add translation',
    translation: 'Translation',
    your_word: 'Your word',
    type: 'Type of word',
    language: 'Language of word',
    set_lang_as_default: 'Set {{value}} as default',
  },
  word: {
    synonyms: 'Synonyms',
    delete_all: 'Delete all',
    are_u_sure: 'Are you sure?',
    delete_all_description:
      'Are you sure you want to delete all words? This action cannot be undone.',
  },
  button: {
    save: 'Save',
    remove: 'Remove',
    view_all: 'View all',
    add: 'Add',
    hide: 'Hide',
    move: 'Move',
    delete: 'Delete',
    start: 'Start',
    answer: 'Answer',
    continue: 'Continue',
    complete: 'Complete',
    cancel: 'Cancel',
  },
  statistics: {
    title: 'Statistics',
    total: 'Total words',
    last_adding: 'The last time you added a word',
    total_folder: 'Total folders',
  },
  folder: {
    folders: 'Folders',
    my_words: 'My words',
    new_folder: 'New folder',
    enter_folder_name: 'Enter folder name',
    move_to_folder: 'Move to Folder',
  },
  export_import: {
    import: 'Import',
    export: 'Export',
    import_data: 'Import data:',
    duplicate: 'Duplicate',
    start_import: 'Start import',
  },

  word_type: {
    word: 'Word',
    phrase: 'Phrase',
  },

  quiz_mode: {
    multiple_choice: 'Multiple choice',
    write_word: 'Write word',
    match: 'Match',
  },

  empty: {
    quiz: {
      title: 'No words found',
      description: 'Add min 10 words to and start a new quiz',
    }
  },
  test_success: {
    congratulations: 'Congratulations!',
    new_quiz: 'Add new words and consolidate your score in a new quiz!',
    excellent: {
      title: '🥶Like a god!😱',
      description: 'Are you sure you need this app?',
    },
    good: {
      title: '😎Great!✌️',
      description:
        'You showed a good result!\nTime to add new words and consolidate the result',
    },
    norm: {
      title: '😏Way to go!😍',
      description:
        'But you can do better!\nTake the test again to memorize more words.',
    },
  },
}
