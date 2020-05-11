/**
 * converter.tsの単体テスト
 * 
 * --1 toCamelForObj関数
 * given: ケースが混ざったオブジェクト（JSON）がある
 * when:  オブジェクトのJSON要素名をキャメルケースに変換するため、converter.toCamelForObj()を使用する
 * then:  オブジェクトの全てのJSON要素名がキャメルケースに変換されて出力される
 */

import logic from '../../src/api/middlewares/converter';

describe('converter.tsの単体テスト', () => {
  const convertObj = require('../../src/services/epcs_{epcs_id}_trace_consumer.json');
  
  it('toCamelForObj関数', async () => {
    const obj = {
      "trace": {
        "epcId": "urn:ibm:ift:product:serial:obj:4966479542960.IAeK.2000",
        "events": [
          {
            "assetId": "urn:ibm:provenance:asset:event:decommission:8f01d375-dc9d-45cc-807e-8f27814ed1e3:default:default:4c987c166d5ed352dd158deb5e351cedc16164793ee97296aced2611e52a5839"
          },
          {
            "assetId": "urn:ibm:provenance:asset:event:observation:8f01d375-dc9d-45cc-807e-8f27814ed1e3:default:default:1007d00a7e4cfa169e7708ed0fd673bf476985b36ec42a984d6fa90a1864d284"
          }
        ],
        "outputEpcs": [],
        "inputEpcs": [],
        "parentEpcs": [
          {
            "epcId": "urn:ibm:ift:lpn:obj:4966479542960.3000",
            "events": [
              {
                "assetId": "urn:ibm:provenance:asset:event:aggregation:8f01d375-dc9d-45cc-807e-8f27814ed1e3:default:default:929c5316ab5fe73076b01e498f9ad57f76c977ed60f281ed18906743af1b3fdc"
              },
              {
                "assetId": "urn:ibm:provenance:asset:event:disaggregation:8f01d375-dc9d-45cc-807e-8f27814ed1e3:default:default:09e68d5285c1028110d39c8969cf090f3cba1218e50e001c8993e77c0d21bc0b"
              },
              {
                "assetId": "urn:ibm:provenance:asset:event:observation:8f01d375-dc9d-45cc-807e-8f27814ed1e3:default:default:3378ff657a020b438f9512ad973b5e8d512867842ca83b5f38461500faf1aab2"
              },
              {
                "assetId": "urn:ibm:provenance:asset:event:observation:8f01d375-dc9d-45cc-807e-8f27814ed1e3:default:default:abe9da1644aa3f71092f467ab6c6664210c468fb08365cba7e3717fe300f8167"
              }
            ],
            "inputEpcs": [],
            "outputEpcs": [],
            "parentEpcs": []
          }
        ],
        "childEpcs": [
          {
            "epcId": "urn:ibm:ift:product:serial:obj:4966479542960.IAeK.1000",
            "events": [
              {
                "assetId": "urn:ibm:provenance:asset:event:aggregation:8f01d375-dc9d-45cc-807e-8f27814ed1e3:default:default:1ee69bc9b08f880a706c8a7f4b4ce65373412e2c71b85a4d36bce782338a97cb"
              }
            ],
            "inputEpcs": [
              {
                "epcId": "urn:ibm:ift:product:lot:class:4966479542960.IAeK.100",
                "events": [
                  {
                    "assetId": "urn:ibm:provenance:asset:event:transformation:8f01d375-dc9d-45cc-807e-8f27814ed1e3:default:default:d3614fe87768ec2158884e14245a17c9c4de0ba465952c628d724b47b593da96"
                  },
                  {
                    "assetId": "urn:ibm:provenance:asset:event:commission:8f01d375-dc9d-45cc-807e-8f27814ed1e3:default:default:179153308d2d457bdbf0456457c9b3ca8d0f49ecf54704eb9d563d2c861a1096"
                  }
                ],
                "inputEpcs": [],
                "childEpcs": [],
                "parentEpcs": []
              }
            ],
            "outputEpcs": [],
            "childEpcs": []
          }
        ]
      },
      "events": [
        {
          "id": "urn:uuid:12ef37c7-546d-428e-a8c0-6995b7888036",
          "assetId": "urn:ibm:provenance:asset:event:decommission:8f01d375-dc9d-45cc-807e-8f27814ed1e3:default:default:4c987c166d5ed352dd158deb5e351cedc16164793ee97296aced2611e52a5839",
          "orgId": "8f01d375-dc9d-45cc-807e-8f27814ed1e3",
          "eventType": "decommission",
          "eventTime": "2020-04-27T13:00:00.000Z",
          "bizStep": "urn:epcglobal:cvb:bizstep:retail_selling",
          "bizLocationId": "urn:ibm:ift:location:loc:4966479542960.jcze",
          "bizSubLocationId": "urn:ibm:ift:location:loc:4966479542960.jcze",
          "epcsIds": [
            "urn:ibm:ift:product:serial:obj:4966479542960.IAeK.2000"
          ],
          "quantities": [],
          "childQuantities": [],
          "inputEpcIds": [],
          "inputQuantities": [],
          "outputEpcIds": [],
          "outputQuantities": [],
          "sourceLocationIds": [
            "urn:ibm:ift:location:loc:4966479542960.jcze"
          ],
          "sourceSubLocationIds": [
            "urn:ibm:ift:location:loc:4966479542960.jcze"
          ],
          "destinationLocationIds": [
            "urn:ibm:ift:location:loc:4966479542960.jcze"
          ],
          "destinationSubLocationIds": [
            "urn:ibm:ift:location:loc:4966479542960.jcze"
          ],
          "transactionIds": []
        },
        {
          "id": "urn:uuid:06c96100-c848-4601-81f0-79dc91d2b129",
          "assetId": "urn:ibm:provenance:asset:event:disaggregation:8f01d375-dc9d-45cc-807e-8f27814ed1e3:default:default:09e68d5285c1028110d39c8969cf090f3cba1218e50e001c8993e77c0d21bc0b",
          "orgId": "8f01d375-dc9d-45cc-807e-8f27814ed1e3",
          "eventType": "disaggregation",
          "eventTime": "2020-04-27T12:00:00.000Z",
          "bizStep": "urn:epcglobal:cvb:bizstep:unpacking",
          "bizLocationId": "urn:ibm:ift:location:loc:4966479542960.jcze",
          "bizSubLocationId": "urn:ibm:ift:location:loc:4966479542960.jcze",
          "epcsIds": [
            "urn:ibm:ift:product:serial:obj:4966479542960.IAeK.2000",
            "urn:ibm:ift:lpn:obj:4966479542960.3000"
          ],
          "parentEpcId": "urn:ibm:ift:lpn:obj:4966479542960.3000",
          "childEpcIds": "urn:ibm:ift:product:serial:obj:4966479542960.IAeK.2000",
          "quantities": [],
          "childQuantities": [],
          "inputEpcIds": [],
          "inputQuantities": [],
          "outputEpcIds": [],
          "outputQuantities": [],
          "sourceLocationIds": [
            "urn:ibm:ift:location:loc:4966479542960.jcze"
          ],
          "sourceSubLocationIds": [
            "urn:ibm:ift:location:loc:4966479542960.jcze"
          ],
          "destinationLocationIds": [
            "urn:ibm:ift:location:loc:4966479542960.jcze"
          ],
          "destinationSubLocationIds": [
            "urn:ibm:ift:location:loc:4966479542960.jcze"
          ],
          "transactionIds": []
        },
        {
          "id": "urn:uuid:de563ebd-8368-4575-b588-33bc58167c47",
          "assetId": "urn:ibm:provenance:asset:event:observation:8f01d375-dc9d-45cc-807e-8f27814ed1e3:default:default:3378ff657a020b438f9512ad973b5e8d512867842ca83b5f38461500faf1aab2",
          "orgId": "8f01d375-dc9d-45cc-807e-8f27814ed1e3",
          "eventType": "observation",
          "eventTime": "2020-04-27T00:00:00.000Z",
          "bizStep": "urn:epcglobal:cbv:bizstep:storing",
          "bizLocationId": "urn:ibm:ift:location:loc:4966479542960.jcze",
          "bizSubLocationId": "urn:ibm:ift:location:loc:4966479542960.jcze",
          "epcsIds": [
            "urn:ibm:ift:lpn:obj:4966479542960.3000"
          ],
          "quantities": [],
          "childQuantities": [],
          "inputEpcIds": [],
          "inputQuantities": [],
          "outputEpcIds": [],
          "outputQuantities": [],
          "sourceLocationIds": [
            "urn:ibm:ift:location:loc:4966479542960.jcze"
          ],
          "sourceSubLocationIds": [
            "urn:ibm:ift:location:loc:4966479542960.jcze"
          ],
          "destinationLocationIds": [
            "urn:ibm:ift:location:loc:4966479542960.jcze"
          ],
          "destinationSubLocationIds": [
            "urn:ibm:ift:location:loc:4966479542960.jcze"
          ],
          "transactionIds": []
        },
        {
          "id": "urn:uuid:c8ee7cda-aba4-4c9e-9f6b-ae5e4938f4a4",
          "assetId": "urn:ibm:provenance:asset:event:observation:8f01d375-dc9d-45cc-807e-8f27814ed1e3:default:default:abe9da1644aa3f71092f467ab6c6664210c468fb08365cba7e3717fe300f8167",
          "orgId": "8f01d375-dc9d-45cc-807e-8f27814ed1e3",
          "eventType": "observation",
          "eventTime": "2020-04-26T23:00:00.000Z",
          "bizStep": "urn:epcglobal:cvb:bizstep:receiving",
          "bizLocationId": "urn:ibm:ift:location:loc:4966479542960.jcze",
          "bizSubLocationId": "urn:ibm:ift:location:loc:4966479542960.jcze",
          "epcsIds": [
            "urn:ibm:ift:lpn:obj:4966479542960.3000"
          ],
          "quantities": [],
          "childQuantities": [],
          "inputEpcIds": [],
          "inputQuantities": [],
          "outputEpcIds": [],
          "outputQuantities": [],
          "sourceLocationIds": [
            "urn:ibm:ift:location:loc:4966479542960.jcze"
          ],
          "sourceSubLocationIds": [
            "urn:ibm:ift:location:loc:4966479542960.jcze"
          ],
          "destinationLocationIds": [
            "urn:ibm:ift:location:loc:4966479542960.jcze"
          ],
          "destinationSubLocationIds": [
            "urn:ibm:ift:location:loc:4966479542960.jcze"
          ],
          "transactionIds": []
        },
        {
          "id": "urn:uuid:6d6e5304-17b8-4887-b65c-12a829da37af",
          "assetId": "urn:ibm:provenance:asset:event:aggregation:8f01d375-dc9d-45cc-807e-8f27814ed1e3:default:default:929c5316ab5fe73076b01e498f9ad57f76c977ed60f281ed18906743af1b3fdc",
          "orgId": "8f01d375-dc9d-45cc-807e-8f27814ed1e3",
          "eventType": "aggregation",
          "eventTime": "2020-04-26T22:00:00.000Z",
          "bizStep": "urn:epcglobal:cbv:bizstep:shipping",
          "disposition": "urn:epcglobal:cbv:disp:in_transit",
          "bizLocationId": "urn:ibm:ift:location:loc:4966479542960.jcze",
          "bizSubLocationId": "urn:ibm:ift:location:loc:4966479542960.jcze",
          "epcsIds": [
            "urn:ibm:ift:product:serial:obj:4966479542960.IAeK.2000",
            "urn:ibm:ift:lpn:obj:4966479542960.3000"
          ],
          "parentEpcId": "urn:ibm:ift:lpn:obj:4966479542960.3000",
          "childEpcIds": "urn:ibm:ift:product:serial:obj:4966479542960.IAeK.2000",
          "quantities": [],
          "childQuantities": [],
          "inputEpcIds": [],
          "inputQuantities": [],
          "outputEpcIds": [],
          "outputQuantities": [],
          "sourceLocationIds": [
            "urn:ibm:ift:location:loc:4966479542960.jcze"
          ],
          "sourceSubLocationIds": [
            "urn:ibm:ift:location:loc:4966479542960.jcze"
          ],
          "destinationLocationIds": [
            "urn:ibm:ift:location:loc:4966479542960.jcze"
          ],
          "destinationSubLocationIds": [
            "urn:ibm:ift:location:loc:4966479542960.jcze"
          ],
          "transactionIds": []
        },
        {
          "id": "urn:uuid:ddf95956-d619-4040-bf6a-d39ce9caf94f",
          "assetId": "urn:ibm:provenance:asset:event:observation:8f01d375-dc9d-45cc-807e-8f27814ed1e3:default:default:1007d00a7e4cfa169e7708ed0fd673bf476985b36ec42a984d6fa90a1864d284",
          "orgId": "8f01d375-dc9d-45cc-807e-8f27814ed1e3",
          "eventType": "observation",
          "eventTime": "2020-04-26T21:00:00.000Z",
          "bizStep": "urn:epcglobal:cbv:bizstep:storing",
          "bizLocationId": "urn:ibm:ift:location:loc:4966479542960.jcze",
          "bizSubLocationId": "urn:ibm:ift:location:loc:4966479542960.jcze",
          "epcsIds": [
            "urn:ibm:ift:product:serial:obj:4966479542960.IAeK.2000"
          ],
          "quantities": [],
          "childQuantities": [],
          "inputEpcIds": [],
          "inputQuantities": [],
          "outputEpcIds": [],
          "outputQuantities": [],
          "sourceLocationIds": [
            "urn:ibm:ift:location:loc:4966479542960.jcze"
          ],
          "sourceSubLocationIds": [
            "urn:ibm:ift:location:loc:4966479542960.jcze"
          ],
          "destinationLocationIds": [
            "urn:ibm:ift:location:loc:4966479542960.jcze"
          ],
          "destinationSubLocationIds": [
            "urn:ibm:ift:location:loc:4966479542960.jcze"
          ],
          "transactionIds": []
        },
        {
          "id": "urn:uuid:975343dc-16bb-4b1b-ade1-576b12a96353",
          "assetId": "urn:ibm:provenance:asset:event:aggregation:8f01d375-dc9d-45cc-807e-8f27814ed1e3:default:default:1ee69bc9b08f880a706c8a7f4b4ce65373412e2c71b85a4d36bce782338a97cb",
          "orgId": "8f01d375-dc9d-45cc-807e-8f27814ed1e3",
          "eventType": "aggregation",
          "eventTime": "2020-04-26T20:00:00.000Z",
          "bizStep": "urn:epcglobal:cbv:bizstep:packing",
          "bizLocationId": "urn:ibm:ift:location:loc:4966479542960.jcze",
          "bizSubLocationId": "urn:ibm:ift:location:loc:4966479542960.jcze",
          "epcsIds": [
            "urn:ibm:ift:product:serial:obj:4966479542960.IAeK.1000",
            "urn:ibm:ift:product:serial:obj:4966479542960.IAeK.2000"
          ],
          "parentEpcId": "urn:ibm:ift:product:serial:obj:4966479542960.IAeK.2000",
          "childEpcIds": "urn:ibm:ift:product:serial:obj:4966479542960.IAeK.1000",
          "quantities": [],
          "childQuantities": [],
          "inputEpcIds": [],
          "inputQuantities": [],
          "outputEpcIds": [],
          "outputQuantities": [],
          "sourceLocationIds": [
            "urn:ibm:ift:location:loc:4966479542960.jcze"
          ],
          "sourceSubLocationIds": [
            "urn:ibm:ift:location:loc:4966479542960.jcze"
          ],
          "destinationLocationIds": [
            "urn:ibm:ift:location:loc:4966479542960.jcze"
          ],
          "destinationSubLocationIds": [
            "urn:ibm:ift:location:loc:4966479542960.jcze"
          ],
          "transactionIds": []
        },
        {
          "id": "urn:uuid:2a6c5283-e290-4015-a9c1-3baaa20b6e40",
          "assetId": "urn:ibm:provenance:asset:event:transformation:8f01d375-dc9d-45cc-807e-8f27814ed1e3:default:default:d3614fe87768ec2158884e14245a17c9c4de0ba465952c628d724b47b593da96",
          "orgId": "8f01d375-dc9d-45cc-807e-8f27814ed1e3",
          "eventType": "transformation",
          "eventTime": "2020-04-26T19:00:00.000Z",
          "bizStep": "urn:epcglobal:cbv:bizstep:creating_class_instance",
          "bizLocationId": "urn:ibm:ift:location:loc:4966479542960.jcze",
          "bizSubLocationId": "urn:ibm:ift:location:loc:4966479542960.jcze",
          "epcsIds": [
            "urn:ibm:ift:product:lot:class:4966479542960.IAeK.100",
            "urn:ibm:ift:product:serial:obj:4966479542960.IAeK.1000"
          ],
          "quantities": [],
          "childQuantities": [],
          "inputEpcIds": [],
          "inputQuantities": [
            {
              "epcId": "urn:ibm:ift:product:lot:class:4966479542960.IAeK.100",
              "quantity": 1,
              "uom": "KGM"
            }
          ],
          "outputEpcIds": [
            "urn:ibm:ift:product:serial:obj:4966479542960.IAeK.1000"
          ],
          "outputQuantities": [],
          "sourceLocationIds": [
            "urn:ibm:ift:location:loc:4966479542960.jcze"
          ],
          "sourceSubLocationIds": [
            "urn:ibm:ift:location:loc:4966479542960.jcze"
          ],
          "destinationLocationIds": [
            "urn:ibm:ift:location:loc:4966479542960.jcze"
          ],
          "destinationSubLocationIds": [
            "urn:ibm:ift:location:loc:4966479542960.jcze"
          ],
          "transactionIds": []
        },
        {
          "id": "urn:uuid:2af1d9f8-be1d-4d65-a79b-ca1f92d35445",
          "assetId": "urn:ibm:provenance:asset:event:commission:8f01d375-dc9d-45cc-807e-8f27814ed1e3:default:default:179153308d2d457bdbf0456457c9b3ca8d0f49ecf54704eb9d563d2c861a1096",
          "orgId": "8f01d375-dc9d-45cc-807e-8f27814ed1e3",
          "eventType": "commission",
          "eventTime": "2020-04-26T18:00:00.000Z",
          "bizStep": "urn:epcglobal:cvb:bizstep:commissioning",
          "disposition": "urn:epcglobal:cbv:disp:Active",
          "bizLocationId": "urn:ibm:ift:location:loc:4966479542960.jcze",
          "bizSubLocationId": "urn:ibm:ift:location:loc:4966479542960.jcze",
          "epcsIds": [
            "urn:ibm:ift:product:lot:class:4966479542960.IAeK.100"
          ],
          "quantities": [
            {
              "epcId": "urn:ibm:ift:product:lot:class:4966479542960.IAeK.100",
              "quantity": 10000,
              "uom": "KGM"
            }
          ],
          "childQuantities": [],
          "inputEpcIds": [],
          "inputQuantities": [],
          "outputEpcIds": [],
          "outputQuantities": [],
          "sourceLocationIds": [
            "urn:ibm:ift:location:loc:4966479542960.jcze"
          ],
          "sourceSubLocationIds": [
            "urn:ibm:ift:location:loc:4966479542960.jcze"
          ],
          "destinationLocationIds": [
            "urn:ibm:ift:location:loc:4966479542960.jcze"
          ],
          "destinationSubLocationIds": [
            "urn:ibm:ift:location:loc:4966479542960.jcze"
          ],
          "transactionIds": []
        }
      ],
      "products": [
        {
          "id": "urn:ibm:ift:product:class:4966479542960.IAeK",
          "orgId": "8f01d375-dc9d-45cc-807e-8f27814ed1e3",
          "description": "pro-trac-7",
          "objectSku": "82507d595beaab43b0a2ea2188c706d7"
        }
      ],
      "locations": [
        {
          "id": "urn:ibm:ift:location:loc:4966479542960.jcze",
          "orgId": "8f01d375-dc9d-45cc-807e-8f27814ed1e3",
          "partyRoleCode": "PORT",
          "partyName": "Kaikou-trac-7",
          "city": "",
          "countryCode": "392",
          "postalCode": ""
        }
      ],
      "lotsAndSerials": [
        {
          "id": "urn:ibm:ift:product:lot:class:4966479542960.IAeK.100",
          "productId": "urn:ibm:ift:product:class:4966479542960.IAeK"
        },
        {
          "id": "urn:ibm:ift:product:serial:obj:4966479542960.IAeK.1000",
          "productId": "urn:ibm:ift:product:class:4966479542960.IAeK"
        }
      ],
      "payloads": []
    };

    expect(logic.toCamelForObj(convertObj)).toMatchObject(obj);
  });
});
