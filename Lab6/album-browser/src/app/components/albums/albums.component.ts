import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { finalize } from 'rxjs';
import { Album } from '../../models/album.model';
import { AlbumService } from '../../services/album.service';

@Component({
  selector: 'app-albums',
  imports: [RouterLink],
  templateUrl: './albums.component.html',
  styleUrl: './albums.component.css'
})
export class AlbumsComponent implements OnInit {
  albums: Album[] = [];
  isLoading = true;
  errorMessage = '';

  constructor(
    private readonly albumService: AlbumService,
    private readonly cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.loadAlbums();
  }

  loadAlbums(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.albumService
      .getAlbums()
      .pipe(finalize(() => {
        this.isLoading = false;
        this.cdr.detectChanges();
      }))
      .subscribe({
        next: (albums) => {
          this.albums = albums;
          this.cdr.detectChanges();
        },
        error: () => {
          this.errorMessage = 'Failed to load albums.';
          this.albums = [];
          this.cdr.detectChanges();
        }
      });
  }

  onDelete(album: Album, event: Event): void {
    event.stopPropagation();
    event.preventDefault();

    this.albumService.deleteAlbum(album.id).subscribe({
      next: () => {
        this.albums = this.albums.filter((item) => item.id !== album.id);
        this.cdr.detectChanges();
      },
      error: () => {
        this.errorMessage = `Failed to delete album #${album.id}.`;
        this.cdr.detectChanges();
      }
    });
  }
}
