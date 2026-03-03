import { Pipe, PipeTransform } from '@angular/core';

/**
 * Converts a via.placeholder.com URL like
 *   https://via.placeholder.com/150/92c952
 * into an inline SVG data URI with that background color.
 * This avoids any external network request for thumbnails.
 */
@Pipe({ name: 'thumbSvg', pure: true, standalone: true })
export class ThumbSvgPipe implements PipeTransform {
    transform(url: string): string {
        // URL format: https://via.placeholder.com/150/92c952[/ffffff]
        // Skip the size number and grab the hex color that comes after it
        const match = url.match(/\/\d+\/([0-9a-fA-F]{3,6})/);
        const bg = match ? `#${match[1]}` : '#6366f1';

        const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="150" height="150">
  <rect width="150" height="150" fill="${bg}"/>
  <rect x="45" y="45" width="60" height="45" rx="4" fill="rgba(255,255,255,0.18)"/>
  <circle cx="60" cy="52" r="6" fill="rgba(255,255,255,0.35)"/>
  <polygon points="48,87 72,60 90,78 102,67 102,87" fill="rgba(255,255,255,0.25)"/>
</svg>`;

        return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
    }
}
