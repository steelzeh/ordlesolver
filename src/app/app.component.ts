import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public c_1 = '';
  public c_2 = '';
  public c_3 = '';
  public c_4 = '';
  public c_5 = '';

  public m_1 = '';
  public m_2 = '';
  public m_3 = '';
  public m_4 = '';
  public m_5 = '';

  public incorrect = '';

  public words: string[] = [];
  public matchedWords: string[] = [];

  constructor(
    private http: HttpClient,
    private cdr: ChangeDetectorRef,
  ) {}

  public ngOnInit() {
    this.http.get('./assets/danish.txt', { responseType: 'text' }).subscribe(data => {
      this.words = data.split('\n');
    });
  }

  public clearValid() {
    this.c_1 = '';
    this.c_2 = '';
    this.c_3 = '';
    this.c_4 = '';
    this.c_5 = '';
  }

  public clearMisplaced() {
    this.m_1 = '';
    this.m_2 = '';
    this.m_3 = '';
    this.m_4 = '';
    this.m_5 = '';
  }

  public onInputChange(event: any, nextInput: any) {
    const inputValue = event.target.value;
    const isBackspace = event.key === 'Backspace';

    if (!isBackspace && inputValue) {
      nextInput.focus();
    }
  }

  public onFindLetters() {
    this.matchedWords = [];
    const lettersInPlace: string[] = [this.c_1.length > 0 ? this.c_1 : '0', this.c_2.length > 0 ? this.c_2 : '0', this.c_3.length > 0 ? this.c_3 : '0', this.c_4.length > 0 ? this.c_4 : '0', this.c_5.length > 0 ? this.c_5 : '0'];
    const lettersNotInPlace: string[] = [this.m_1, this.m_2, this.m_3, this.m_4, this.m_5].filter(letter => letter !== '');
    const incorrectLetters: string[] = this.incorrect.split('');

    for (const word of this.words) {
      let correct: string[] = [];
      let misplaced: string[] = [];
      let skipWord = false;

      for (let i = 0; i < word.length; i++) {
        const letter = word[i];

        if (incorrectLetters.includes(letter)) {
          skipWord = true;
          break;
        }

        if (lettersInPlace && letter === lettersInPlace[i] && i === lettersInPlace.indexOf(letter)) {
          correct.push(letter);
        }

        if (lettersNotInPlace.includes(letter) && !misplaced.includes(letter)) {
          misplaced.push(letter);
        }
      }

      if (skipWord) {
        continue;
      }

      if (misplaced.length >= lettersNotInPlace.length && correct.length === lettersInPlace.filter((letter) => letter !== '0').length) {
        this.matchedWords.push(word);
      }
    }
  }
}
