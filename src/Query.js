export default class Query {

    constructor(sdk) {
        this.query = {

        }
        this.sdk = sdk;
        this._offset = 0;
        this._limit = 20;
    }

    formatData(data) {
        if (typeof data !== 'object')
            data = [data];
        return data;
    }

    projets(data) {
        data = this.formatData(data);
        this.query.projets = data.join(',')
        return this;
    }

    profils(data) {
        data = this.formatData(data);
        console.log(data);
        this.query.profils = data.join(',')
        return this;
    }

    niveaux(data) {
        data = this.formatData(data);
        this.query.niveaux = data.join(',')
        return this;
    }

    natures(data) {
        data = this.formatData(data);
        this.query.natures = data.join(',')
        return this;
    }

    territoire(id) {
        this.query.territoire = id;
        return this;
    }

    effectif(id) {
        if (id == false)
            delete this.query.effectif;
        else
            this.query.effectif = id;
        return this;
    }

    criteres(data) {
        data = this.formatData(data);
        this.query.criteres = data.join(',')
        return this;
    }

    remove(cat, id) {
        try {
            let ids = this.query[cat].split(',');
            let tmp = [];
            for (var i in ids) {
                if (ids[i] != id)
                    tmp.push(ids[i]);
            }
            if (tmp.length > 0)
                this.query[cat] = tmp.join(',');
            else
                delete this.query[cat];
        }
        catch (err) {
            console.log(err);
        }
        return this;
    }

    offset(offset) {
        this._offset = offset;
        return this;
    }
    
    limit(limit) {
        this._limit = limit;
        return this;
    }

    isEmptyQuery() {
        if (Object.keys(this.query).length < 1)
            return true;
        else
            return false;
    }

    async execute(emitRes = true) {
        if (Object.keys(this.query).length < 1) {
            this.sdk.emit('queryIsEmpty');
            return;
        }
        if (JSON.stringify(this.query) != this.lastQuery)
            this._offset = 0;
        let res = await this.sdk.fetch('/aides?clean_html=true&status=1&offset=' + this._offset + '&' + Object.entries(this.query).map(([key, val]) => `${key}=${val}`).join('&'));
        this.lastQuery = JSON.stringify(this.query);
        if (res.meta.total > (this._offset + 1) * this._limit)
            res.showMore = true;
        else
            res.showMore = false;
        if (emitRes)
            this.sdk.emit('resultat', res);
        return res;
    }




}
