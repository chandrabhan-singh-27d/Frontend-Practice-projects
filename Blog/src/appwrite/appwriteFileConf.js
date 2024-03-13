import config from "../config/config";
import { ID, Storage, Client } from "appwrite";

export class Service {
    client = new Client();
    bucket;

    constructor() {
        this.client
            .setEndpoint(config.aapwriteURL)
            .setProject(config.appwriteProjectId)
        this.bucket = new Storage(this.client);
    }

    async uploadFile(file) {
        try {
            return await this.bucket.createFile(
                config.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            throw error;
        }
    }

    async deleteFile(fileID) {
        try {
            await this.bucket.deleteFile(
                config.appwriteBucketId,
                fileID
            )
            return true;
        } catch (error) {
            throw error;
        }
    }

    getFilePreview(fileID) {
        return this.bucket.getFilePreview(
            config.appwriteBucketId,
            fileID
        )
    }
}

const storageService = new Service();

export default storageService;