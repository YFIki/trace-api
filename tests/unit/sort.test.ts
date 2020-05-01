/**
 * sort.tsの単体テスト
 * 
 * given: ソート対象配列がある状態
 * when:  arraySortを実行
 * then:  ソート対象配列が指定したkeyのデータが指定したソート順でソートされていること
 */
describe('sort.tsの単体テスト', () => {
  const arrayEvents = {
    "events": [
      {
        "id": "urn:uuid:12ef37c7-546d-428e-a8c0-6995b7888036",
        "asset_id": "urn:ibm:provenance:asset:event:decommission:8f01d375-dc9d-45cc-807e-8f27814ed1e3:default:default:4c987c166d5ed352dd158deb5e351cedc16164793ee97296aced2611e52a5839",
        "org_id": "8f01d375-dc9d-45cc-807e-8f27814ed1e3",
        "event_type": "decommission",
        "event_time": "2020-04-27T13:00:00.000Z",
        "biz_step": "urn:epcglobal:cvb:bizstep:retail_selling",
        "biz_location_id": "urn:ibm:ift:location:loc:4966479542960.jcze",
        "biz_sub_location_id": "urn:ibm:ift:location:loc:4966479542960.jcze",
        "epcs_ids": [
          "urn:ibm:ift:product:serial:obj:4966479542960.IAeK.2000"
        ],
        "quantities": [],
        "child_quantities": [],
        "input_epc_ids": [],
        "input_quantities": [],
        "output_epc_ids": [],
        "output_quantities": [],
        "source_location_ids": [
          "urn:ibm:ift:location:loc:4966479542960.jcze"
        ],
        "source_sub_location_ids": [
          "urn:ibm:ift:location:loc:4966479542960.jcze"
        ],
        "destination_location_ids": [
          "urn:ibm:ift:location:loc:4966479542960.jcze"
        ],
        "destination_sub_location_ids": [
          "urn:ibm:ift:location:loc:4966479542960.jcze"
        ],
        "transaction_ids": []
      },
      {
        "id": "urn:uuid:06c96100-c848-4601-81f0-79dc91d2b129",
        "asset_id": "urn:ibm:provenance:asset:event:disaggregation:8f01d375-dc9d-45cc-807e-8f27814ed1e3:default:default:09e68d5285c1028110d39c8969cf090f3cba1218e50e001c8993e77c0d21bc0b",
        "org_id": "8f01d375-dc9d-45cc-807e-8f27814ed1e3",
        "event_type": "disaggregation",
        "event_time": "2020-04-27T12:00:00.000Z",
        "biz_step": "urn:epcglobal:cvb:bizstep:unpacking",
        "biz_location_id": "urn:ibm:ift:location:loc:4966479542960.jcze",
        "biz_sub_location_id": "urn:ibm:ift:location:loc:4966479542960.jcze",
        "epcs_ids": [
          "urn:ibm:ift:product:serial:obj:4966479542960.IAeK.2000",
          "urn:ibm:ift:lpn:obj:4966479542960.3000"
        ],
        "parent_epc_id": "urn:ibm:ift:lpn:obj:4966479542960.3000",
        "child_epc_ids": "urn:ibm:ift:product:serial:obj:4966479542960.IAeK.2000",
        "quantities": [],
        "child_quantities": [],
        "input_epc_ids": [],
        "input_quantities": [],
        "output_epc_ids": [],
        "output_quantities": [],
        "source_location_ids": [
          "urn:ibm:ift:location:loc:4966479542960.jcze"
        ],
        "source_sub_location_ids": [
          "urn:ibm:ift:location:loc:4966479542960.jcze"
        ],
        "destination_location_ids": [
          "urn:ibm:ift:location:loc:4966479542960.jcze"
        ],
        "destination_sub_location_ids": [
          "urn:ibm:ift:location:loc:4966479542960.jcze"
        ],
        "transaction_ids": []
      },
      {
        "id": "urn:uuid:de563ebd-8368-4575-b588-33bc58167c47",
        "asset_id": "urn:ibm:provenance:asset:event:observation:8f01d375-dc9d-45cc-807e-8f27814ed1e3:default:default:3378ff657a020b438f9512ad973b5e8d512867842ca83b5f38461500faf1aab2",
        "org_id": "8f01d375-dc9d-45cc-807e-8f27814ed1e3",
        "event_type": "observation",
        "event_time": "2020-04-27T00:00:00.000Z",
        "biz_step": "urn:epcglobal:cbv:bizstep:storing",
        "biz_location_id": "urn:ibm:ift:location:loc:4966479542960.jcze",
        "biz_sub_location_id": "urn:ibm:ift:location:loc:4966479542960.jcze",
        "epcs_ids": [
          "urn:ibm:ift:lpn:obj:4966479542960.3000"
        ],
        "quantities": [],
        "child_quantities": [],
        "input_epc_ids": [],
        "input_quantities": [],
        "output_epc_ids": [],
        "output_quantities": [],
        "source_location_ids": [
          "urn:ibm:ift:location:loc:4966479542960.jcze"
        ],
        "source_sub_location_ids": [
          "urn:ibm:ift:location:loc:4966479542960.jcze"
        ],
        "destination_location_ids": [
          "urn:ibm:ift:location:loc:4966479542960.jcze"
        ],
        "destination_sub_location_ids": [
          "urn:ibm:ift:location:loc:4966479542960.jcze"
        ],
        "transaction_ids": []
      }
    ]
  };


  it('sortArrayObject()にて、配列名が指定されているArray<object>の日付を基準にソートした際、想定通りにソートされるかのテスト', async () => {
    const logic = require('../../src/api/middlewares/sort');
    const sortArray = {
      "events": [
        {
          "id": "urn:uuid:de563ebd-8368-4575-b588-33bc58167c47",
          "asset_id": "urn:ibm:provenance:asset:event:observation:8f01d375-dc9d-45cc-807e-8f27814ed1e3:default:default:3378ff657a020b438f9512ad973b5e8d512867842ca83b5f38461500faf1aab2",
          "org_id": "8f01d375-dc9d-45cc-807e-8f27814ed1e3",
          "event_type": "observation",
          "event_time": "2020-04-27T00:00:00.000Z",
          "biz_step": "urn:epcglobal:cbv:bizstep:storing",
          "biz_location_id": "urn:ibm:ift:location:loc:4966479542960.jcze",
          "biz_sub_location_id": "urn:ibm:ift:location:loc:4966479542960.jcze",
          "epcs_ids": [
            "urn:ibm:ift:lpn:obj:4966479542960.3000"
          ],
          "quantities": [],
          "child_quantities": [],
          "input_epc_ids": [],
          "input_quantities": [],
          "output_epc_ids": [],
          "output_quantities": [],
          "source_location_ids": [
            "urn:ibm:ift:location:loc:4966479542960.jcze"
          ],
          "source_sub_location_ids": [
            "urn:ibm:ift:location:loc:4966479542960.jcze"
          ],
          "destination_location_ids": [
            "urn:ibm:ift:location:loc:4966479542960.jcze"
          ],
          "destination_sub_location_ids": [
            "urn:ibm:ift:location:loc:4966479542960.jcze"
          ],
          "transaction_ids": []
        },
        {
          "id": "urn:uuid:06c96100-c848-4601-81f0-79dc91d2b129",
          "asset_id": "urn:ibm:provenance:asset:event:disaggregation:8f01d375-dc9d-45cc-807e-8f27814ed1e3:default:default:09e68d5285c1028110d39c8969cf090f3cba1218e50e001c8993e77c0d21bc0b",
          "org_id": "8f01d375-dc9d-45cc-807e-8f27814ed1e3",
          "event_type": "disaggregation",
          "event_time": "2020-04-27T12:00:00.000Z",
          "biz_step": "urn:epcglobal:cvb:bizstep:unpacking",
          "biz_location_id": "urn:ibm:ift:location:loc:4966479542960.jcze",
          "biz_sub_location_id": "urn:ibm:ift:location:loc:4966479542960.jcze",
          "epcs_ids": [
            "urn:ibm:ift:product:serial:obj:4966479542960.IAeK.2000",
            "urn:ibm:ift:lpn:obj:4966479542960.3000"
          ],
          "parent_epc_id": "urn:ibm:ift:lpn:obj:4966479542960.3000",
          "child_epc_ids": "urn:ibm:ift:product:serial:obj:4966479542960.IAeK.2000",
          "quantities": [],
          "child_quantities": [],
          "input_epc_ids": [],
          "input_quantities": [],
          "output_epc_ids": [],
          "output_quantities": [],
          "source_location_ids": [
            "urn:ibm:ift:location:loc:4966479542960.jcze"
          ],
          "source_sub_location_ids": [
            "urn:ibm:ift:location:loc:4966479542960.jcze"
          ],
          "destination_location_ids": [
            "urn:ibm:ift:location:loc:4966479542960.jcze"
          ],
          "destination_sub_location_ids": [
            "urn:ibm:ift:location:loc:4966479542960.jcze"
          ],
          "transaction_ids": []
        },{
          "id": "urn:uuid:12ef37c7-546d-428e-a8c0-6995b7888036",
          "asset_id": "urn:ibm:provenance:asset:event:decommission:8f01d375-dc9d-45cc-807e-8f27814ed1e3:default:default:4c987c166d5ed352dd158deb5e351cedc16164793ee97296aced2611e52a5839",
          "org_id": "8f01d375-dc9d-45cc-807e-8f27814ed1e3",
          "event_type": "decommission",
          "event_time": "2020-04-27T13:00:00.000Z",
          "biz_step": "urn:epcglobal:cvb:bizstep:retail_selling",
          "biz_location_id": "urn:ibm:ift:location:loc:4966479542960.jcze",
          "biz_sub_location_id": "urn:ibm:ift:location:loc:4966479542960.jcze",
          "epcs_ids": [
            "urn:ibm:ift:product:serial:obj:4966479542960.IAeK.2000"
          ],
          "quantities": [],
          "child_quantities": [],
          "input_epc_ids": [],
          "input_quantities": [],
          "output_epc_ids": [],
          "output_quantities": [],
          "source_location_ids": [
            "urn:ibm:ift:location:loc:4966479542960.jcze"
          ],
          "source_sub_location_ids": [
            "urn:ibm:ift:location:loc:4966479542960.jcze"
          ],
          "destination_location_ids": [
            "urn:ibm:ift:location:loc:4966479542960.jcze"
          ],
          "destination_sub_location_ids": [
            "urn:ibm:ift:location:loc:4966479542960.jcze"
          ],
          "transaction_ids": []
        }
      ]
    };

    expect(logic.sortArrayObject(arrayEvents, 'event_time', 'asc', 'events')).toEqual(sortArray);
  });

  it('sortArrayObject()にて、配列名が指定されていないArray<object>の日付を基準にソートした際、想定通りにソートされるかのテスト', async () => {
    const logic = require('../../src/api/middlewares/sort');
    const sortArray = [
        {
          "id": "urn:uuid:de563ebd-8368-4575-b588-33bc58167c47",
          "asset_id": "urn:ibm:provenance:asset:event:observation:8f01d375-dc9d-45cc-807e-8f27814ed1e3:default:default:3378ff657a020b438f9512ad973b5e8d512867842ca83b5f38461500faf1aab2",
          "org_id": "8f01d375-dc9d-45cc-807e-8f27814ed1e3",
          "event_type": "observation",
          "event_time": "2020-04-27T00:00:00.000Z",
          "biz_step": "urn:epcglobal:cbv:bizstep:storing",
          "biz_location_id": "urn:ibm:ift:location:loc:4966479542960.jcze",
          "biz_sub_location_id": "urn:ibm:ift:location:loc:4966479542960.jcze",
          "epcs_ids": [
            "urn:ibm:ift:lpn:obj:4966479542960.3000"
          ],
          "quantities": [],
          "child_quantities": [],
          "input_epc_ids": [],
          "input_quantities": [],
          "output_epc_ids": [],
          "output_quantities": [],
          "source_location_ids": [
            "urn:ibm:ift:location:loc:4966479542960.jcze"
          ],
          "source_sub_location_ids": [
            "urn:ibm:ift:location:loc:4966479542960.jcze"
          ],
          "destination_location_ids": [
            "urn:ibm:ift:location:loc:4966479542960.jcze"
          ],
          "destination_sub_location_ids": [
            "urn:ibm:ift:location:loc:4966479542960.jcze"
          ],
          "transaction_ids": []
        },
        {
          "id": "urn:uuid:06c96100-c848-4601-81f0-79dc91d2b129",
          "asset_id": "urn:ibm:provenance:asset:event:disaggregation:8f01d375-dc9d-45cc-807e-8f27814ed1e3:default:default:09e68d5285c1028110d39c8969cf090f3cba1218e50e001c8993e77c0d21bc0b",
          "org_id": "8f01d375-dc9d-45cc-807e-8f27814ed1e3",
          "event_type": "disaggregation",
          "event_time": "2020-04-27T12:00:00.000Z",
          "biz_step": "urn:epcglobal:cvb:bizstep:unpacking",
          "biz_location_id": "urn:ibm:ift:location:loc:4966479542960.jcze",
          "biz_sub_location_id": "urn:ibm:ift:location:loc:4966479542960.jcze",
          "epcs_ids": [
            "urn:ibm:ift:product:serial:obj:4966479542960.IAeK.2000",
            "urn:ibm:ift:lpn:obj:4966479542960.3000"
          ],
          "parent_epc_id": "urn:ibm:ift:lpn:obj:4966479542960.3000",
          "child_epc_ids": "urn:ibm:ift:product:serial:obj:4966479542960.IAeK.2000",
          "quantities": [],
          "child_quantities": [],
          "input_epc_ids": [],
          "input_quantities": [],
          "output_epc_ids": [],
          "output_quantities": [],
          "source_location_ids": [
            "urn:ibm:ift:location:loc:4966479542960.jcze"
          ],
          "source_sub_location_ids": [
            "urn:ibm:ift:location:loc:4966479542960.jcze"
          ],
          "destination_location_ids": [
            "urn:ibm:ift:location:loc:4966479542960.jcze"
          ],
          "destination_sub_location_ids": [
            "urn:ibm:ift:location:loc:4966479542960.jcze"
          ],
          "transaction_ids": []
        },{
          "id": "urn:uuid:12ef37c7-546d-428e-a8c0-6995b7888036",
          "asset_id": "urn:ibm:provenance:asset:event:decommission:8f01d375-dc9d-45cc-807e-8f27814ed1e3:default:default:4c987c166d5ed352dd158deb5e351cedc16164793ee97296aced2611e52a5839",
          "org_id": "8f01d375-dc9d-45cc-807e-8f27814ed1e3",
          "event_type": "decommission",
          "event_time": "2020-04-27T13:00:00.000Z",
          "biz_step": "urn:epcglobal:cvb:bizstep:retail_selling",
          "biz_location_id": "urn:ibm:ift:location:loc:4966479542960.jcze",
          "biz_sub_location_id": "urn:ibm:ift:location:loc:4966479542960.jcze",
          "epcs_ids": [
            "urn:ibm:ift:product:serial:obj:4966479542960.IAeK.2000"
          ],
          "quantities": [],
          "child_quantities": [],
          "input_epc_ids": [],
          "input_quantities": [],
          "output_epc_ids": [],
          "output_quantities": [],
          "source_location_ids": [
            "urn:ibm:ift:location:loc:4966479542960.jcze"
          ],
          "source_sub_location_ids": [
            "urn:ibm:ift:location:loc:4966479542960.jcze"
          ],
          "destination_location_ids": [
            "urn:ibm:ift:location:loc:4966479542960.jcze"
          ],
          "destination_sub_location_ids": [
            "urn:ibm:ift:location:loc:4966479542960.jcze"
          ],
          "transaction_ids": []
        }
      ];

    expect(logic.sortArrayObject(arrayEvents.events, 'event_time', 'asc')).toEqual(sortArray);
  });
});
