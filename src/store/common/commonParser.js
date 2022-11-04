import { get } from "lodash-es";

export const parser_cribs_get_list = (response) => {
    try {
        let data = {};
        data.count = response.count || 0;
        if (response?.data) {
            response = response.data;
        }
        if (!response) {
            return [];
        }

        response = response.map((e) => ({
            cribs_id: get(e, "_id", ""),
            name: get(e, "name", ""),
            img: get(e, "img", ""),
            location: get(e, "location", ""),
            createdAt: get(e, "createdAt", ""),
            is_active: get(e, "is_active", "")
        }));


        data.data = response;
        return data;
    } catch (error) {
        throw new Error(error);
    }
};

export const parser_cribs_get = (response) => {
    try {
        if (response?.data) {
            response = response.data;
        }
        if (!response) {
            return {};
        }

        return {
            cribs_id: get(response, "_id", ""),
            name: get(response, "name", ""),
            img: get(response, "img", ""),
            location: get(response, "location", ""),
        }

    } catch (error) {
        throw new Error(error);
    }
};