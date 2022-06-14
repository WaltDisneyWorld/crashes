import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { HeaderComponent } from './header/header.component';
import { GameComponent } from './game/game.component';

import { MyBetsComponent } from './components/my-bets/my-bets.component';
import { GameViewerComponent } from './components/game-viewer/game-viewer.component';
import { BetsFormComponent } from './components/bets-form/bets-form.component';
import { LastMatchesComponent } from './components/last-matches/last-matches.component';
import { BestWinningBetsComponent } from './components/best-winning-bets/best-winning-bets.component';
import { UserLoginComponent } from './components/user-login/user-login.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    GameComponent,
    MyBetsComponent,
    GameViewerComponent,
    BetsFormComponent,
    LastMatchesComponent,
    BestWinningBetsComponent,
    UserLoginComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
