import {ICompanyItemResponseModel} from "../company-item/ICompanyItem.response-model";

export interface ICompanyDetailResponseModel extends ICompanyItemResponseModel {
    catch_phrase: string,
    phone_number: string,
    full_address: string,
    latitude: number;
    longitude: number;
}
