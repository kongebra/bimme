import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { AngularFirestore } from '@angular/fire/firestore';

import { Post } from '../schema/post.model';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private db: AngularFirestore) {}

  createPost(post: Post) {
    return this.db.collection('posts').add(post);
  }

  updatePost(post: Post) {
    delete post.id;
    this.db.doc(`posts/${post.id}`).update(post);
  }

  getAll() {
    return this.db.collection<Post>('posts').snapshotChanges();
  }

  getSingle(id: string) {
    return this.db.collection('posts').doc(id).snapshotChanges();
  }
}
