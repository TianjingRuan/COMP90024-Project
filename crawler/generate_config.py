import json

config = \
{
    "API":
    {
        "consumer_key": "eI5ZwDgi2ERjn3QuKYbA0NIjD",
        "consumer_secret": "iuRoQ1xNW8sAlY2VTAkr3Xg7j1rGMvNRidFfRCIiGlFQ9ls7kO",
        "access_token": "1385422794653986817-r8CowyQ95AGhr1O5u9vRBpQlA8gh5n",
        "access_token_secret": "GZkQqCa2l5XZNd2kcv8KLBGK2VDnWbolgr0tRhY2z3zg1"
    },
    "City":
    {
        "adelaide":
        {
            "place_id": "01e8a1a140ccdc5c",
            "coordinates": [-34.928889, 138.601111],
            "bounding_box": [138.44212992, -35.348970061, 138.780189824, -34.652564053],
            "scope": "20km"
        },
        "brisbane":
        {
            "place_id": "004ec16c62325149",
            "coordinates": [-27.467778, 153.028056],
            "bounding_box": [152.668522848, -27.767440994, 153.31787024, -26.996844991],
            "scope": "20km"
        },
        "melbourne":
        {
            "place_id": "01864a8a64df9dc4",
            "coordinates": [-37.813611, 144.963056],
            "bounding_box": [144.593741856, -38.433859306, 145.512528832, -37.5112737225],
            "scope": "20km"
        },
        "perth":
        {
            "place_id": "0118c71c0ed41109",
            "coordinates": [-31.952222, 115.858889],
            "bounding_box": [115.617614368, -32.675715325, 116.239023008, -31.6244855145],
            "scope": "20km"
        },
        "sydney":
        {
            "place_id": "0073b76548e5984f",
            "coordinates": [-33.865, 151.209444],
            "bounding_box": [150.520928608, -34.1183470085, 151.343020992, -33.578140996],
            "scope": "20km"
        }
    }
}

json_obj = json.dumps(config, indent=4)
with open("config.json", 'w') as f:
    f.write(json_obj)
