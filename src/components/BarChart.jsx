import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

const BarChart = () => {
  const [series, setSeries] = useState([]);
  const [options, setOptions] = useState({
    chart: {
      type: "bar",
      height: 440,
      stacked: true,
    },
    colors: ["#008FFB", "#FF4560"],
    plotOptions: {
      bar: {
        borderRadius: 5,
        borderRadiusApplication: "end",
        borderRadiusWhenStacked: "all",
        horizontal: true,
        barHeight: "80%",
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      width: 1,
      colors: ["#fff"],
    },
    grid: {
      xaxis: {
        lines: {
          show: false,
        },
      },
    },
    yaxis: {
      stepSize: 1,
    },
    tooltip: {
      shared: false,
      x: {
        formatter: function (val) {
          return val;
        },
      },
      y: {
        formatter: function (val) {
          return Math.abs(val);
        },
      },
    },
    title: {
      text: "Population Pyramid",
    },
    xaxis: {
      categories: [],
      title: {
        text: "Population (in millions)",
      },
      labels: {
        formatter: function (val) {
          return Math.abs(val);
        },
      },
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        const countries = await response.json();

        // China and India population data
        const china = countries.find(
          (country) => country.name.common === "China"
        );
        const india = countries.find(
          (country) => country.name.common === "India"
        );

        const chinaMale = ((china.population * 0.51) / 1000000).toFixed(0); // Erkak aholisi taxminan 51%, millionda
        const chinaFemale = ((china.population * 0.49) / 1000000).toFixed(0); // Ayol aholisi taxminan 49%, millionda
        const indiaMale = ((india.population * 0.51) / 1000000).toFixed(0);
        const indiaFemale = ((india.population * 0.49) / 1000000).toFixed(0);

        setSeries([
          {
            name: "Males",
            data: [indiaMale, chinaMale],
          },
          {
            name: "Females",
            data: [-indiaFemale, -chinaFemale],
          },
        ]);

        setOptions((prevOptions) => ({
          ...prevOptions,
          xaxis: {
            categories: ["India", "China"],
            title: {
              text: "Population (in millions)",
            },
            labels: {
              formatter: function (val) {
                return Math.abs(val);
              },
            },
          },
        }));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <div id="chart">
        <ReactApexChart
          options={options}
          series={series}
          type="bar"
          height={440}
        />
      </div>
      <div id="html-dist"></div>
    </div>
  );
};

export default BarChart;
