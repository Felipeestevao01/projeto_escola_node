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
                        this.addError(field, method, ...args);
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
        return this.errors ? true : false

    }


    addError(campo, method, value = 0) {
        if (!this.errors[campo]) {
            this.errors[campo] = [];
        }
        if (method === 'min') {
            this.errors[campo].push(`O Campo ${campo} deve ter no minimo ${value}`);
            return
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

        if (typeof value === 'string') {
            return value.length >= parseInt(minLength)
        }


        if (typeof value === 'object') {
            return value.length >= parseInt(minLength)
        }

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

