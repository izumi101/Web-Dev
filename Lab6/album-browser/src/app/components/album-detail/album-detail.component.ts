import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { finalize, switchMap } from 'rxjs';
import { Album } from '../../models/album.model';
import { AlbumService } from '../../services/album.service';

@Component({
  selector: 'app-album-detail',
  imports: [FormsModule, RouterLink],
  templateUrl: './album-detail.component.html',
  styleUrl: './album-detail.component.css'
})
export class AlbumDetailComponent implements OnInit {
  album: Album | null = null;
  title = '';
  isLoading = true;
  isSaving = false;
  errorMessage = '';
  saveMessage = '';

  constructor(
    private readonly route: ActivatedRoute,
    private readonly albumService: AlbumService,
    private readonly location: Location,
    private readonly cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        switchMap((params) => {
          this.isLoading = true;
          this.errorMessage = '';
          const id = Number(params.get('id'));
          return this.albumService.getAlbum(id).pipe(finalize(() => {
            this.isLoading = false;
            this.cdr.detectChanges();
          }));
        })
      )
      .subscribe({
        next: (album) => {
          this.album = album;
          this.title = album.title;
          this.cdr.detectChanges();
        },
        error: () => {
          this.errorMessage = 'Failed to load album details.';
          this.cdr.detectChanges();
        }
      });
  }

  onSave(): void {
    if (!this.album) return;

    this.isSaving = true;
    this.saveMessage = '';

    const updatedAlbum: Album = {
      ...this.album,
      title: this.title.trim() || this.album.title
    };

    this.albumService
      .updateAlbum(updatedAlbum)
      .pipe(finalize(() => {
        this.isSaving = false;
        this.cdr.detectChanges();
      }))
      .subscribe({
        next: (response) => {
          this.album = response;
          this.title = response.title;
          this.saveMessage = 'Saved successfully.';
          this.cdr.detectChanges();
        },
        error: () => {
          this.saveMessage = 'Failed to save changes.';
          this.cdr.detectChanges();
        }
      });
  }

  goBack(): void {
    this.location.back();
  }
}
