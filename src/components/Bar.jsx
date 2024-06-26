import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

const Bar = () => {
  const [chartData, setChartData] = useState({
    series: [
      {
        name: "Population",
        data: [],
      },
    ],
    options: {
      chart: {
        type: "bar",
      },
      plotOptions: {
        bar: {
          horizontal: true, // Chiziqli diagramma
        },
      },
      xaxis: {
        categories: [],
      },
      yaxis: {
        labels: {
          style: {
            fontSize: "12px", // O'lchamni o'zgartirish (ixtiyoriy)
            fontWeight: "bold", // Yozuvni qalin qilish (ixtiyoriy)
          },
        },
      },
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        const countries = await response.json();
        const countryData = countries.map((country) => ({
          name: country.name.common,
          population: country.population,
        }));

        // Aholi soni bo'yicha tartiblash va 50 ta davlatni olish
        countryData.sort((a, b) => b.population - a.population);
        const top50Countries = countryData.slice(0, 50);

        const countryNames = top50Countries.map((country) => country.name);
        const countryPopulations = top50Countries.map(
          (country) => country.population
        );

        setChartData({
          series: [
            {
              name: "Population",
              data: countryPopulations,
            },
          ],
          options: {
            chart: {
              type: "bar",
            },
            plotOptions: {
              bar: {
                horizontal: true, // Chiziqli diagramma
              },
            },
            xaxis: {
              categories: countryNames,
            },
            yaxis: {
              labels: {
                style: {
                  fontSize: "12px", // O'lchamni o'zgartirish (ixtiyoriy)
                  fontWeight: "bold", // Yozuvni qalin qilish (ixtiyoriy)
                },
              },
            },
          },
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="chart">
      <ReactApexChart
        options={chartData.options}
        series={chartData.series}
        type="bar"
        height={1000} // Balandlikni oshirish (ixtiyoriy)
      />
    </div>
  );
};

export default Bar;
