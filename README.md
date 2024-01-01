# Trans-Cord Discord Bot

## Overview

Trans-Cord is a Discord bot designed to facilitate text translation using the DeepL API. With Trans-Cord, users can
easily translate text messages, access their translation history, delete previous translations, and manage their
language preferences. This bot aims to provide a seamless translation experience within Discord servers.

To see our [api docs](http://15.188.11.78:3000/api-docs/) you can click on the link.

## Features

- **Translation Command:** Utilize the `/translate <text> [lang]` command to translate text using the DeepL API. The
  optional `[lang]` parameter allows users to specify the target language.

- **Translation History:** Retrieve your translation history with the `/translate-history` command. This feature enables
  users to keep track of their previous translations.

- **Delete Previous Translation:** Use the `/delete-translation` command to delete your most recent translation. This
  can be handy if you want to clear clutter or correct a mistake.

- **Delete Language Setting:** Remove a preferred language setting with the `/translate-delete [lang]` command.

- **Update Preferred Language:** Customize your translation experience by updating your preferred language with
  the `/translate-lang [lang]` command. This setting will be applied to future translations.

## Getting Started

To use Trans-Cord, just join our [official discord server](https://discord.gg/8besmQbW) and start translating! If you
want to host the bot on your own server, follow the installation instructions below.)

## Commands

- `/translate <text> [lang]`: Translate the specified text to the optional target language.

- `/translate-history`: View your translation history.

- `/translate-delete [id]`: Remove a previous translation.

- `/translate-lang [lang]`: Set your preferred language for translations.

## Installation

To host Trans-Cord on your own server, follow these steps:

1. Clone the Trans-Cord repository.
2. Set up your environment variables in a `.env` file.
3. Install the required dependencies using the provided package manager, including Prisma. Use the following command:
    ```bash
    yarn install
    ```
4. Set up the DeepL API key in the configuration file.
5. Run the database migration with Prisma using the following command:
    ```bash
    npx prisma migrate dev
    ```
6. Run the bot.

## Contributions

Contributions to the Trans-Cord project are welcome! Feel free to fork the repository, make changes, and submit a pull
request. Make sure to follow the contribution guidelines.

## Support

If you encounter any issues or have questions, please create a new issue in the GitHub repository.

Happy translating with Trans-Cord!
