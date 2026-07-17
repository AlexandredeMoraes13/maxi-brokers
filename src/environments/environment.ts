// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // URL do backend que recebe as solicitações de atendimento e envia por e-mail.
  // NÃO contém credenciais — apenas o endereço público do endpoint.
  // As credenciais do e-mail (login/senha) ficam somente no servidor (variáveis de ambiente).
  // Deixe vazio até o backend estar pronto; o formulário funciona em modo de confirmação.
  supportEndpoint: ''
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
