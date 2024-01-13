import { NextResponse } from "next/server";
import { Pinecone } from "@pinecone-database/pinecone";

import { TextLoader } from "langchain/document_loaders/fs/text";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { DirectoryLoader } from "langchain/document_loaders/fs/directory";
import { createPineconeIndex, updatePinecone } from "../../../utils";
import { indexName } from "../../../config";


export async function POST () {
    const loader = new DirectoryLoader("./documents", {
        ".txt": (path) => new TextLoader(path),
        ".pdf": (path) => new PDFLoader(path),
        ".md": (path) => new TextLoader(path),
        
    });
    const docs = await loader.load();
    const vectorDimensions = 1536;

    const client = new Pinecone({
        apiKey: process.env.PINECONE_API_KEY || "", 
        environment: process.env.PINECONE_ENVIRONMENT || "",
    });

    try {
        await createPineconeIndex(client, indexName, vectorDimensions);
        await updatePinecone(client, indexName, docs);
    } catch (err) {
        console.log(err);
    }

    return NextResponse.json({ data:"successfully created index at loaded data in pinecone..." });
}
