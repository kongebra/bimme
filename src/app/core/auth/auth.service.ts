import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import * as firebase from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { User } from '@app/shared/models/user.model';

enum Role {
  Subscriber = 'subscriber',
  Editor = 'editor',
  Admin = 'admin',
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$: Observable<User>;

  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFirestore,
    private router: Router
  ) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          return this.db.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }

  googleLogin(): Promise<void> {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.oAuthLogin(provider);
  }

  signOut(): Promise<void> {
    return this.afAuth.signOut();
  }

  private oAuthLogin(provider: firebase.auth.AuthProvider): Promise<void> {
    return this.afAuth.signInWithPopup(provider).then((credentials) => {
      this.updateUserData(credentials.user);
    });
  }

  private updateUserData(user: firebase.User) {
    const userRef: AngularFirestoreDocument<User> = this.db.doc(
      `users/${user.uid}`
    );

    const data: User = {
      uid: user.uid,
      email: user.email,
      roles: {
        subscriber: true,
      },
    };

    return userRef.set(data, { merge: true });
  }

  canRead(user: User): boolean {
    const allowed = [Role.Admin, Role.Editor, Role.Subscriber];
    return this.checkAuhtorization(user, allowed);
  }

  canEdit(user: User): boolean {
    const allowed = [Role.Admin, Role.Editor];
    return this.checkAuhtorization(user, allowed);
  }

  canDelete(user: User): boolean {
    const allowed = [Role.Subscriber];
    return this.checkAuhtorization(user, allowed);
  }

  private checkAuhtorization(user: User, allowed: string[]): boolean {
    if (!user) {
      return false;
    }

    for (const role of allowed) {
      if (user.roles[role]) {
        return true;
      }
    }

    return false;
  }
}
