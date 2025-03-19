const { MongoClient } = require('mongodb');
const { config } = require('../config/config');

class Mongo
{
    constructor(connect=null,db=null)
    {
        if(connect){
            this.client = new MongoClient(connect);
        }else{
            this.client = new MongoClient(config.MONGO_URL);
        }
        if(db){
            this.dbName = db;
        }else{
            this.dbName = config.MONGO_DB_NAME;
        }
    }

    async connect(fn)
    {
        try {
            const connection = await this.client.connect();
            console.log('Connected successfully to server');
            fn(connection.db(this.dbName));
        } catch (error) {
            console.error(error);
        }
    }

    db(){
        return {
            insert:(collection,data,fn)=>this.connect((db)=>this.insert(db,collection,data,fn)),
            get:(collection,data,fn)=>this.connect((db)=>this.find(db,collection,data,fn)),
            update:(collection,data,set,fn)=>this.connect((db)=>this.update(db,collection,data,set,fn)),
            delete:(collection,data,fn)=>this.connect((db)=>this.delete(db,collection,data,fn)),
        }
    }

    async insert(db,collection,data,fn)
    {
        const d = db.collection(collection);
        // const req = async ()=>{
            try {
                const res = await d.insertOne(data);
                fn(res);
            } catch (error) {
                console.error(error);
            }
        // }
    }
    async find(db,collection,data,fn)
    {
        const d = db.collection(collection);
        // console.log(d.);
        // const req = async ()=>{
            try {
                const res = await d.find(data).toArray();
                fn(res);
            } catch (error) {
                console.error(error);
            }
        // }
    }
    async update(db,collection,data,set,fn)
    {
        const d = db.collection(collection);
        // console.log(d.);
        // const req = async ()=>{
            try {
                const res = await d.updateOne(data,{$set:set});
                fn(res);
            } catch (error) {
                console.error(error);
            }
        // }
    }

    async delete(db,collection,data,fn)
    {
        const d = db.collection(collection);
        // console.log(d.);
        // const req = async ()=>{
            try {
                const res = await d.deleteMany(data);
                fn(res);
            } catch (error) {
                console.error(error);
            }
        // }
    }
    hola(h)
    {
        console.log(h)
    }
}

module.exports = {Mongo}