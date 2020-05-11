/**
 * トレース情報を返却する
 * @return {object} トレース情報
 */
export const getTraceList = (): object => {
	const mockData: object = 
		{
			"events": [
				{
					"datetime": "2020/04/27 5:00",
					"facility": "海光物産",
					"bizLocation": {
						"latitude": 35.690300,
						"longitude": 139.981273
					},
					"stateId": 1,
					"bizStep": "漁獲",
					"disposition": "アクティブ"
				},
				{
					"datetime": "2020/04/27 10:00",
					"facility": "海光物産",
					"bizLocation": {
						"latitude": 35.690300,
						"longitude": 139.981273
					},
					"stateId": 2,
					"bizStep": "加工",
					"disposition": "NoDisposition"
				},
				{
					"datetime": "2020/04/27 13:00",
					"facility": "レストラン",
					"bizLocation": {
						"latitude": 35.690300,
						"longitude": 139.981273
					},
					"stateId": 3,
					"bizStep": "",
					"disposition": ""
				}
			],
			"payload": {
				"coordinate": { "latitude": 35.531889, "longitude": 139.919972 },
				"casting_net_time": "2020/04/27 3:00", //"yyyy/mm/dd HH:MM"
				"lifting_net_time": "2020/04/27 4:00" //"yyyy/mm/dd HH:MM"
			}
		}
	
	return mockData;
};
