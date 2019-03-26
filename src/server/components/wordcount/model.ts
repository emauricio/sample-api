import * as mongoose from 'mongoose';

export interface IWordCount {
    count: number;
    keyword: string;
    url: string;
}

const schema = new mongoose.Schema({
    count: Number,
    keyword: String,
    url: String
}, { timestamps: true });

const wordCountModel = mongoose.model<IWordCount & mongoose.Document>('WordCount', schema);

export { wordCountModel };
