// import {Component, inject, OnInit} from '@angular/core';
// import {HttpClient} from '@angular/common/http';
//
// @Component({
//   selector: 'app-email-confirm',
//   imports: [],
//   templateUrl: './email-confirm.component.html',
//   styleUrl: './email-confirm.component.scss'
// })
// export class EmailConfirmComponent implements OnInit {
//   activatedRoute: inject(ActivatedRoute);
//   http = inject(HttpClient);
//   notification:
//   router: inject(Router);
//
//   token?: string;
//
//   ngOnInit() {
//
//     this.activatedRoute.params
//     .subscribe(params => {
//
//       if (params['token']) {
//         this.token = params['token'];
//       }
//     })
//   }
//
//   if (this.token) {
//   this.http
//     .post<{
//   token: string;
//   dataUsageConsentment: boolean;
// }>("http://localhost:3000/email-confirm.htm", {})
//   .subscribe(result => {
// next:
//
