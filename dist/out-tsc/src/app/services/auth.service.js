import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
let AuthService = class AuthService {
    constructor() { }
    auth(email, password) {
        if (email === 'rosimereinfo@gmail.com' && password === '123456') {
            return true;
        }
        return false;
    }
};
AuthService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], AuthService);
export { AuthService };
//# sourceMappingURL=auth.service.js.map