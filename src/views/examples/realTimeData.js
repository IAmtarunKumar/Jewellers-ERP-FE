import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import highchartsMap from "highcharts/modules/map";
import mapData from "./world.geo.json";
import {
  Card,
  CardHeader,
  Container,
  Row,

  // UncontrolledTooltip,
} from "reactstrap";
import DataTable from "react-data-table-component";
import MarketingHeader from "components/Headers/marketingHeader";
highchartsMap(Highcharts);

const RealTimeData = () => {
  const [realTimeData, setRealTimeData] = useState([]);
  const [pending, setPending] = useState(true);
  const [resetPaginationToggle] = useState(false);
  const [marketingReport, setMarketingReport] = useState([]);

  const marketingTableColumns = () => [
    {
      name: "Country",
      selector: (row) => row[0],
    },
    {
      name: "City",
      selector: (row) => row[2],
    },
    {
      name: "Users",
      selector: (row) => row[3],
    },
    {
      name: "Device",
      selector: (row) => row[1],
    },
  ];
  useEffect(() => {
    fetchRealTimeData();
    // eslint-disable-next-line
  }, []);

  const fetchRealTimeData = async () => {
    try {
      const response = await fetch("https://chat1.ocpl.tech:12003/realtime", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          dimensions: ["country", "deviceCategory", "city"],
          metrics: ["activeUsers"],
          row_limit: 10,
          quota_usage: true,
        }),
      });

      const data = await response.json();
      // // console.log(data);
      setMarketingReport(data.rows);
      setPending(false);
      const transformedData = transformData(data.rows);
      setRealTimeData(transformedData);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setPending(false);
    }
  };

  // Function to transform the data
  const transformData = (data) => {
    let transformedData = {};

    data.forEach((datapoint) => {
      const country = datapoint[0];
      const activeUsers = Number(datapoint[3]);

      if (country in transformedData) {
        transformedData[country] += activeUsers;
      } else {
        transformedData[country] = activeUsers;
      }
    });

    let highchartsData = [];
    for (const country in transformedData) {
      highchartsData.push({
        "hc-key": getCountryISOCode(country),
        value: transformedData[country],
      });
    }

    return highchartsData;
  };
  const getCountryISOCode = (countryName) => {
    const countryISOCodeMapping = {
      Afghanistan: "af",
      Albania: "al",
      Algeria: "dz",
      Andorra: "ad",
      Angola: "ao",
      "Antigua and Barbuda": "ag",
      Argentina: "ar",
      Armenia: "am",
      Australia: "au",
      Austria: "at",
      Azerbaijan: "az",
      Bahamas: "bs",
      Bahrain: "bh",
      Bangladesh: "bd",
      Barbados: "bb",
      Belarus: "by",
      Belgium: "be",
      Belize: "bz",
      Benin: "bj",
      Bhutan: "bt",
      Bolivia: "bo",
      "Bosnia and Herzegovina": "ba",
      Botswana: "bw",
      Brazil: "br",
      Brunei: "bn",
      Bulgaria: "bg",
      "Burkina Faso": "bf",
      Burundi: "bi",
      "Côte d'Ivoire": "ci",
      "Cabo Verde": "cv",
      Cambodia: "kh",
      Cameroon: "cm",
      Canada: "ca",
      "Central African Republic": "cf",
      Chad: "td",
      Chile: "cl",
      China: "cn",
      Colombia: "co",
      Comoros: "km",
      "Congo (Congo-Brazzaville)": "cg",
      "Costa Rica": "cr",
      Croatia: "hr",
      Cuba: "cu",
      Cyprus: "cy",
      "Czechia (Czech Republic)": "cz",
      "Democratic Republic of the Congo": "cd",
      Denmark: "dk",
      Djibouti: "dj",
      Dominica: "dm",
      "Dominican Republic": "do",
      Ecuador: "ec",
      Egypt: "eg",
      "El Salvador": "sv",
      "Equatorial Guinea": "gq",
      Eritrea: "er",
      Estonia: "ee",
      'Eswatini (fmr. "Swaziland")': "sz",
      Ethiopia: "et",
      Fiji: "fj",
      Finland: "fi",
      France: "fr",
      Gabon: "ga",
      Gambia: "gm",
      Georgia: "ge",
      Germany: "de",
      Ghana: "gh",
      Greece: "gr",
      Grenada: "gd",
      Guatemala: "gt",
      Guinea: "gn",
      "Guinea-Bissau": "gw",
      Guyana: "gy",
      Haiti: "ht",
      "Holy See": "va",
      Honduras: "hn",
      Hungary: "hu",
      Iceland: "is",
      India: "in",
      Indonesia: "id",
      Iran: "ir",
      Iraq: "iq",
      Ireland: "ie",
      Israel: "il",
      Italy: "it",
      Jamaica: "jm",
      Japan: "jp",
      Jordan: "jo",
      Kazakhstan: "kz",
      Kenya: "ke",
      Kiribati: "ki",
      Kuwait: "kw",
      Kyrgyzstan: "kg",
      Laos: "la",
      Latvia: "lv",
      Lebanon: "lb",
      Lesotho: "ls",
      Liberia: "lr",
      Libya: "ly",
      Liechtenstein: "li",
      Lithuania: "lt",
      Luxembourg: "lu",
      Madagascar: "mg",
      Malawi: "mw",
      Malaysia: "my",
      Maldives: "mv",
      Mali: "ml",
      Malta: "mt",
      "Marshall Islands": "mh",
      Mauritania: "mr",
      Mauritius: "mu",
      Mexico: "mx",
      Micronesia: "fm",
      Moldova: "md",
      Monaco: "mc",
      Mongolia: "mn",
      Montenegro: "me",
      Morocco: "ma",
      Mozambique: "mz",
      "Myanmar (formerly Burma)": "mm",
      Namibia: "na",
      Nauru: "nr",
      Nepal: "np",
      Netherlands: "nl",
      "New Zealand": "nz",
      Nicaragua: "ni",
      Niger: "ne",
      Nigeria: "ng",
      "North Korea": "kp",
      "North Macedonia (formerly Macedonia)": "mk",
      Norway: "no",
      Oman: "om",
      Pakistan: "pk",
      Palau: "pw",
      "Palestine State": "ps",
      Panama: "pa",
      "Papua New Guinea": "pg",
      Paraguay: "py",
      Peru: "pe",
      Philippines: "ph",
      Poland: "pl",
      Portugal: "pt",
      Qatar: "qa",
      Romania: "ro",
      Russia: "ru",
      Rwanda: "rw",
      "Saint Kitts and Nevis": "kn",
      "Saint Lucia": "lc",
      "Saint Vincent and the Grenadines": "vc",
      Samoa: "ws",
      "San Marino": "sm",
      "Sao Tome and Principe": "st",
      "Saudi Arabia": "sa",
      Senegal: "sn",
      Serbia: "rs",
      Seychelles: "sc",
      "Sierra Leone": "sl",
      Singapore: "sg",
      Slovakia: "sk",
      Slovenia: "si",
      "Solomon Islands": "sb",
      Somalia: "so",
      "South Africa": "za",
      "South Korea": "kr",
      "South Sudan": "ss",
      Spain: "es",
      "Sri Lanka": "lk",
      Sudan: "sd",
      Suriname: "sr",
      Sweden: "se",
      Switzerland: "ch",
      Syria: "sy",
      Tajikistan: "tj",
      Tanzania: "tz",
      Thailand: "th",
      "Timor-Leste": "tl",
      Togo: "tg",
      Tonga: "to",
      "Trinidad and Tobago": "tt",
      Tunisia: "tn",
      Turkey: "tr",
      Turkmenistan: "tm",
      Tuvalu: "tv",
      Uganda: "ug",
      Ukraine: "ua",
      "United Arab Emirates": "ae",
      "United Kingdom": "gb",
      "United States of America": "us",
      Uruguay: "uy",
      Uzbekistan: "uz",
      Vanuatu: "vu",
      Venezuela: "ve",
      Vietnam: "vn",
      Yemen: "ye",
      Zambia: "zm",
      Zimbabwe: "zw",
    };

    return countryISOCodeMapping[countryName];
  };
  const mapOptions = {
    chart: {
      map: mapData,
      height: 800,
      events: {
        load: function () {
          const chart = this;
          chart.mapZoom(0.7);
        },
      },
    },
    title: {
      text: "Real Time World Map",
    },
    mapNavigation: {
      enabled: true,
      buttonOptions: {
        verticalAlign: "bottom",
      },
    },
    colorAxis: {
      min: 0,
      minColor: "#cce1fb",
      maxColor: "#1173ef",
    },
    series: [
      {
        data: realTimeData,
        name: "Active Users",
        states: {
          hover: {
            color: "#1171ef",
          },
        },
        dataLabels: {
          enabled: true,
          format: "{point.name}",
        },
      },
    ],
  };

  return (
    <>
      <MarketingHeader />
      <Container className="mt-7" fluid>
        <HighchartsReact
          constructorType={"mapChart"}
          highcharts={Highcharts}
          options={mapOptions}
        />
        {/* Table */}

        <Row className="mt-5">
          <div className="col">
            <Card className="bg-default shadow">
              <CardHeader className="bg-transparent border-0">
                <h3 className="text-white mb-0">Real Time Data</h3>
              </CardHeader>
              <DataTable
                columns={marketingTableColumns()}
                data={marketingReport}
                pagination
                paginationResetDefaultPage={resetPaginationToggle}
                progressPending={pending}
              />
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default RealTimeData;
