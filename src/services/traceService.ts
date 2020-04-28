import { OptionsJson } from "body-parser";
import { Object } from "lodash";

export const getTraceList = () => {
    const mockData: object = 
        {
            "trace_list": [
            {
                "datetime": "2020/04/27 5:00",
                "facility": "海光物産",
                "stateId": 1,
                "bizStep": "漁獲",
                "disposition": "アクティブ"
            },
            {
                "datetime": "2020/04/27 10:00",
                "facility": "海光物産",
                "stateId": 2,
                "bizStep": "加工",
                "disposition": "NoDisposition"
            },
            {
                "datetime": "2020/04/27 13:00",
                "facility": "海光物産",
                "stateId": 3,
                "bizStep": "小売販売",
                "disposition": "消費者購入済"
            }
            ]
        };
    
    return mockData;
};
