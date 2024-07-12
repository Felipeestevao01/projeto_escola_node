class Validator {
    constructor(req, rules) {
        this.req = req;
        this.rules = rules;
        this.errors = {};
    }

    async validate() {
        for (let rule of this.rules) {
            const { field, validations } = rule;
            const value = this.req[field];

            for (let validation of validations) {
                if (typeof validation === 'string') {
                    const [method, ...args] = validation.split(':');

                    if (!this[method](value, ...args)) {
                        this.addError(field, method);
                    }
                } else if (typeof validation === 'object') {
                    const { validator, model } = validation;
                    for (const v of validator) {
                        const [method, ...args] = v.split(':');


                        if (await this[method](value, model, ...args) === false) {
                            this.addError(field, method);

                        }
                    }
                }
            }
        }

        return Object.keys(this.errors).length == 0;
    }

    addError(campo, method) {
        if (!this.errors[campo]) {
            this.errors[campo] = [];
        }
        this.errors[campo].push(`Validação ${method} falhou no campo ${campo}`);
    }

    getErrors() {
        return this.errors;
    }

    required(value) {
        return value !== undefined && value !== null && value !== '';
    }

    min(value, minLength) {
        return typeof value === 'string' && value.length >= parseInt(minLength);
    }

    max(value, maxLength) {
        return typeof value === 'string' && value.length <= parseInt(maxLength);
    }

    email(value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value);
    }

    async exist(id, model) {
        if (!id) {
            return false;
        }
        const record = await model.buscar(id);

        if (record) {
            return true
        }

        return false;
    }

    // Adicione mais métodos de validação conforme necessário
}

export default Validator;

