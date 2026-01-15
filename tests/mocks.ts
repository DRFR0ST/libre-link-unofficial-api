export const LibreLinkLoginMock = {
    user: {
        "id": "dummy_id",
        "firstName": "John",
        "lastName": "Doe",
        "email": "john.doe@example.com",
        "country": "US",
        "uiLanguage": "en-US",
        "communicationLanguage": "en-US",
        "accountType": "dummy_type",
        "uom": "2",
        "dateFormat": "1",
        "timeFormat": "1",
        "emailDay": [
            2
        ],
        "system": {
            "messages": {
                "appReviewBanner": 1234567890,
                "firstUsePhoenix": 1234567890,
                "firstUsePhoenixReportsDataMerged": 1234567890,
                "lluGettingStartedBanner": 1234567890,
                "lluNewFeatureModal": 1234567890,
                "lvWebPostRelease": "1.0.0",
                "streamingTourMandatory": 1234567890
            }
        },
        "details": {},
        "twoFactor": {
            "primaryMethod": "SMS",
            "primaryValue": "555-123-4567",
            "secondaryMethod": "Email",
            "secondaryValue": "john.doe@example.com"
        },
        "created": "2023-04-01T10:00:00.000Z",
        "lastLogin": "2023-04-02T11:00:00.000Z",
        "programs": {},
        "dateOfBirth": "1980-01-01T00:00:00.000Z",
        "practices": {
            "dummy_practice_id": {
                "id": "dummy_practice_id",
                "practiceId": "1234567890",
                "name": "Example Practice",
                "address1": "123 Main Street",
                "city": "Anytown",
                "state": "CA",
                "zip": "12345",
                "phoneNumber": "555-123-4567",
                "records": null
            }
        },
        "devices": {
            "dummy_device_id_1": {
                "id": "dummy_device_id_1",
                "nickname": "My Device",
                "sn": "ABCDEF123456",
                "type": 1234,
                "uploadDate": 1234567890
            },
            "dummy_device_id_2": {
                "id": "dummy_device_id_2",
                "nickname": "My Other Device",
                "sn": "GHIJKL789012",
                "type": 5678,
                "uploadDate": 1234567890
            }
        },
        "consents": {
            "realWorldEvidence": {
                "policyAccept": 1234567890,
                "touAccept": 1234567890,
                "history": []
            }
        }
    }
};

export const LibreLinkConnectionsMock = {
    "status": 4,
    "data": [
        {
            "id": "95f2e7a1-8180-442c-a3a4-981989898989",
            "patientId": "1a1a1a1a-1a1a-1a1a-1a1a-1a1a1a1a1a1a",
            "country": "XX",
            "status": 1,
            "firstName": "John",
            "lastName": "Doe",
            "targetLow": 60,
            "targetHigh": 120,
            "uom": 2,
            "sensor": {
                "deviceId": "",
                "sn": "XX01XXRXXX",
                "a": 1234567890,
                "w": 45,
                "pt": 2,
                "s": false,
                "lj": true
            },
            "alarmRules": {
                "c": false,
                "h": {
                    "th": 180,
                    "thmm": 10,
                    "d": 1000,
                    "f": 0.2
                },
                "f": {
                    "th": 65,
                    "thmm": 3.6,
                    "d": 45,
                    "tl": 15,
                    "tlmm": 0.8
                },
                "l": {
                    "on": false,
                    "th": 80,
                    "thmm": 4.4,
                    "d": 1200,
                    "tl": 12,
                    "tlmm": 0.7
                },
                "nd": {
                    "i": 25,
                    "r": 8,
                    "l": 4
                },
                "p": 3,
                "r": 7,
                "std": {}
            },
            "glucoseMeasurement": {
                "FactoryTimestamp": "1/1/2024 1:00:00 AM",
                "Timestamp": "1/2/2024 1:00:00 AM",
                "type": 2,
                "ValueInMgPerDl": 95,
                "TrendArrow": 2,
                "TrendMessage": "Stable",
                "MeasurementColor": 2,
                "GlucoseUnits": 2,
                "Value": 4.75,
                "isHigh": false,
                "isLow": false
            },
            "glucoseItem": {
                "FactoryTimestamp": "1/1/2024 1:00:00 AM",
                "Timestamp": "1/2/2024 1:00:00 AM",
                "type": 2,
                "ValueInMgPerDl": 95,
                "TrendArrow": 2,
                "TrendMessage": "Stable",
                "MeasurementColor": 2,
                "GlucoseUnits": 2,
                "Value": 4.75,
                "isHigh": false,
                "isLow": false
            },
            "glucoseAlarm": null,
            "patientDevice": {
                "did": "00000000-0000-0000-0000-000000000000",
                "dtid": 12345,
                "v": "1.0.0.0",
                "l": false,
                "ll": 80,
                "hl": 180,
                "u": 9876543210,
                "fixedLowAlarmValues": {
                    "mgdl": 70,
                    "mmoll": 3.9
                },
                "alarms": false,
                "fixedLowThreshold": 1
            },
            "created": 1672531200
        }
    ],
    "ticket": {
        "token": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
        "expires": 1987654321,
        "duration": 86400000
    }
};

export const LibreLinkReadMock = { connection: LibreLinkConnectionsMock.data[0] }

// Mock with multiple connections for testing patient ID selection
export const LibreLinkMultipleConnectionsMock = {
    "status": 4,
    "data": [
        {
            ...LibreLinkConnectionsMock.data[0],
            "patientId": "patient-abc-123",
            "firstName": "Alice",
            "lastName": "Smith",
        },
        {
            ...LibreLinkConnectionsMock.data[0],
            "id": "a1b2c3d4-5678-90ab-cdef-123456789012",
            "patientId": "patient-xyz-789",
            "firstName": "Bob",
            "lastName": "Johnson",
        },
        {
            ...LibreLinkConnectionsMock.data[0],
            "id": "e5f6a7b8-9012-34cd-ef56-789012345678",
            "patientId": "patient-def-456",
            "firstName": "Charlie",
            "lastName": "Brown",
        }
    ],
    "ticket": LibreLinkConnectionsMock.ticket
};