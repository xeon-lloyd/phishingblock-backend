module.exports = {
  apps : [{
    name: 'phisingBlock',
    script: 'server.js',
    instances: 1,
    exec_mode  : "fork",
    watch: false,
    time: true,
  }],
};
