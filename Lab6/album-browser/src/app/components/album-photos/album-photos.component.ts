import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { finalize, switchMap } from 'rxjs';
import { Photo } from '../../models/photo.model';
import { AlbumService } from '../../services/album.service';
import { ThumbSvgPipe } from './thumb-svg.pipe';

@Component({
  selector: 'app-album-photos',
  imports: [ThumbSvgPipe],
  templateUrl: './album-photos.component.html',
  styleUrl: './album-photos.component.css'
})
export class AlbumPhotosComponent implements OnInit {
  albumId = 0;
  photos: Photo[] = [];
  isLoading = true;
  errorMessage = '';

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
          this.albumId = Number(params.get('id'));
          return this.albumService
            .getAlbumPhotos(this.albumId)
            .pipe(finalize(() => {
              this.isLoading = false;
              this.cdr.detectChanges();
            }));
        })
      )
      .subscribe({
        next: (photos) => {
          this.photos = photos;
          this.cdr.detectChanges();
        },
        error: () => {
          this.errorMessage = 'Failed to load photos.';
          this.photos = [];
          this.cdr.detectChanges();
        }
      });
  }

  goBack(): void {
    this.location.back();
  }
}
