/* global fetch */
import Query from './Query';
import EventEmitter from './Utils/EventEmitter';

window.aidesEntreprisesSDK = class Sdk extends EventEmitter {

    constructor() {
        
        super();
        
        this.settings = {
            url: 'https://data.aides-entreprises.fr/sdk.php?uri='
        }

        this._data = {};
        this._query = null
    }
    
    query() {
        if(!this._query)
            this._query = new Query(this);
        return this._query;
    }

    async projets() {
        if (this._data['projets'])
            return this._data['projets'];
        let data = await this.projetsRaw();
        data = data.data;
        let result = [];
        for (var i in data) {
            result.push({
                id: data[i].categorie.id_proj,
                nom: data[i].categorie.proj_libelle,
                parent: 0
            })
            for (var j in data[i].values) {
                result.push({
                    id: data[i].values[j].id_proj,
                    nom: data[i].values[j].proj_libelle,
                    parent: data[i].values[j].proj_parent
                })
            }
        }
        this._data['projets'] = result;
        return result;
    }

    async profils() {
        if (this._data['profils'])
            return this._data['profils'];
        let data = await this.profilsRaw();
        data = data.data;
        let result = [];
        for (var i in data) {
            result.push({
                id: data[i].id_tut,
                nom: data[i].tut_libelle
            })
        }
        this._data['profils'] = result;
        return result;
    }

    async natures() {
        if (this._data['natures'])
            return this._data['natures'];
        let data = await this.naturesRaw();
        data = data.data;
        let result = [];
        for (var i in data) {
            result.push({
                id: data[i].id_typ,
                nom: data[i].typ_libelle
            })
        }
        this._data['natures'] = result;
        return result;
    }

    async niveaux() {
        if (this._data['niveaux'])
            return this._data['niveaux'];
        let data = await this.niveauxRaw();
        data = data.data;
        let result = [];
        for (var i in data) {
            result.push({
                id: data[i].id_geo,
                nom: data[i].geo_nom
            })
        }
        this._data['niveaux'] = result;
        return result;
    }
    
    async criteres() {
        return [{
                id: '1',
                nom: 'Demandeur d\'emploi'
            },{
                id: '2',
                nom: 'Femme'
            },{
                id: '3',
                nom: 'Sénior'
            },{
                id: '4',
                nom: 'Handicapé'
            },{
                id: '5',
                nom: 'Jeune'
            }
        ]
    }

    async typeTerritoires() {
        if (this._data['types_territoires'])
            return this._data['types_territoires'];
        let data = await this.fetch('/types_territoires');
        data = data.data;
        let result = {};
        for (var i in data) {
            result[data[i].id_tte] = data.tte_libelle;
        }
        this._data['types_territoires'] = result;
        return result;

    }

    async rechercheTerritoiresParNom(name) {
        let typeTerritoire = await this.typeTerritoires();
        let data = await this.territoiresRaw(name)
        data = data.data;
        let result = [];
        for (var i in data) {
            result.push({
                id: data[i].id_ter,
                nom: data[i].ter_libelle,
                type: typeTerritoire[data[i].ter_fk_type],
                code_postal: data[i].ter_code,
                code_insee: data[i].insee
            })
        }
        return result;
    }

    async projetsRaw() {
        return await this.fetch('/projets');
    }

    async profilsRaw() {
        return await this.fetch('/profils');
    }

    async naturesRaw() {
        return await this.fetch('/natures');
    }

    async niveauxRaw() {
        return await this.fetch('/niveaux');
    }

    async typesTerritoiresRaw() {
        return await this.fetch('/types_territoires');
    }

    async territoiresRaw(name) {
        return await this.fetch('/territoires?full_text=' + name);
    }


    async fetch(uri) {
        this.emit('load');
        let response = await fetch(this.settings.url + encodeURIComponent(uri))
        this.emit('loadComplete');
        return response.json();
    }

    /*
        let arr = [
            { name:"string 1", value:"this", other: "that" },
            { name:"string 2", value:"this", other: "that" }
        ];
    
        let obj = arr.find(o => o.name === 'string 1');
    
        console.log(obj);
    */



}

export default window.aidesEntreprisesSDK;