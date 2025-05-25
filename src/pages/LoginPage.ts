import { Locator, Page } from '@playwright/test';

export class LoginPage {
  private username: Locator;
  private password: Locator;
  private submitButton: Locator;

  constructor(private page: Page) {
    this.username = this.page.locator('[data-test="username"]');
    this.password = this.page.locator('[data-test="password"]');
    this.submitButton = this.page.locator('[data-test="login-button"]');
  }

  async goto() {
    await this.page.goto('/');
  }

  async login(user: string, pass: string) {
    await this.username.fill(user);
    await this.password.fill(pass);
    await this.submitButton.click();
  }
}