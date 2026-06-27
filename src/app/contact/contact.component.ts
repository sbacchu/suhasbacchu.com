import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  copiedType: 'email' | 'phone' | null = null;

  constructor() { }

  ngOnInit() {
  }

  copyToClipboard(text: string, type: 'email' | 'phone') {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        this.copiedType = type;
        setTimeout(() => {
          this.copiedType = null;
        }, 2000);
      }).catch(err => {
        console.error('Could not copy text: ', err);
      });
    } else {
      // Fallback
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand('copy');
        this.copiedType = type;
        setTimeout(() => {
          this.copiedType = null;
        }, 2000);
      } catch (err) {
        console.error('Fallback copy failed: ', err);
      }
      document.body.removeChild(textArea);
    }
  }
}
