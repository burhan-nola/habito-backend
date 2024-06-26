const deviceModel = require("../models/devices.js");

exports.light = async (req, res) => {
  try {
    const light = req.query.light;
    const date = new Date();
    const offsetInMinutes = +420;
    const local = new Date(date.getTime() + offsetInMinutes * 60000);
    const tanggal = local.toISOString().split("T")[0];

    const data = await deviceModel.findOne({ idDevice: req.query.id });
    const lightData = data.light[light];
    const lastStatus =
      lightData.length > 0 ? lightData[lightData.length - 1] : [];
    // if (lastStatus.length === 0) {
    //   const updateData = {
    //     status: true,
    //     date: local,
    //   };

    //   lightData.push(updateData);
    //   await data.save();
    //   return res
    //     .status(201)
    //     .json({ message: `${light} light is on`, data: updateData });
    // }
    const convert = lastStatus.date.toISOString().split("T")[0];

    if (convert !== tanggal || !lastStatus.status) {
      const updateData = {
        status: true,
        date: local,
      };

      lightData.push(updateData);
      await data.save();
      return res
        .status(201)
        .json({ message: `${light} light is on`, data: updateData });
    }
    res.status(200).json(convert);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.getLight = async (req, res) => {
  try {
    const date = new Date();
    const offsetInMinutes = +420;
    const local = new Date(date.getTime() + offsetInMinutes * 60000);
    const tanggal = local.toISOString().split("T")[0];

    const data = await deviceModel.findOne({ idDevice: req.body.id });
    const dataLight = JSON.stringify(data.light);
    const parseLight = JSON.parse(dataLight);

    function filterByDate(parseLight, date) {
      for (let color in parseLight) {
        if (Array.isArray(parseLight[color])) {
          parseLight[color] = parseLight[color].filter(
            (obj) => new Date(obj.date).toISOString().slice(0, 10) === date
          );
        }
      }
      return parseLight;
    }

    const filteredData = filterByDate(parseLight, tanggal);

    const result = {};
    for (const color in filteredData) {
      if (Array.isArray(filteredData[color])) {
        // Check if the color data is not empty
        if (filteredData[color].length > 0) {
          result[color] = filteredData[color][filteredData[color].length - 1];
        } else {
          // If color data is empty, set status to false
          result[color] = { status: false };
        }
      }
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.filterLight = async (req, res) => {
  try {
    const date = new Date();
    const offsetInMinutes = +420;
    const local = new Date(date.getTime() + offsetInMinutes * 60000);
    const tanggal = local.toISOString().split("T")[0];

    const data = await deviceModel.findOne({ idDevice: req.query.id });
    const dataLight = JSON.stringify(data.light);
    const parseLight = JSON.parse(dataLight);

    function filterByDate(parseLight, date) {
      for (let color in parseLight) {
        if (Array.isArray(parseLight[color])) {
          parseLight[color] = parseLight[color].filter(
            (obj) => new Date(obj.date).toISOString().slice(0, 10) === date
          );
        }
      }
      return parseLight;
    }

    const filteredData = filterByDate(parseLight, tanggal);

    res.status(200).json(filteredData);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.detailTask = async (req, res) => {
  try {
    const data = await deviceModel.findOne({ idDevice: req.query.id });
    const detailTask = data.detailLight;
    res.status(200).json(detailTask);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.editTask = async (req, res) => {
  try {
    const data = await deviceModel.findOne({ idDevice: req.query.id });
    const { task1, task2, task3, task4 } = req.body;
    const updateTask = {
      red: task1,
      green: task2,
      blue: task3,
      yellow: task4,
    };

    data.detailLight = updateTask;
    await data.save();
    res.status(200).json({ message: "task updated" });
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.allLightData = async (req, res) => {
  try {
    const data = await deviceModel.findOne({ idDevice: req.query.id });
    const lightData = data.light;
    res.status(200).json(lightData);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.abortData = async (req, res) => {
  try {
    const data = await deviceModel.findOne({ idDevice: req.query.id });
    const color = req.query.color;
    data.light[color].pop();
    data.save();
    res.status(200).json(data.light[color]);
  } catch (error) {
    res.status(500).json(error);
  }
};
