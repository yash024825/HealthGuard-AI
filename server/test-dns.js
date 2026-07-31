const dns = require("dns").promises;

(async () => {
  try {
    const result = await dns.resolveSrv(
      "_mongodb._tcp.healthguardcluster.nbvbsw6.mongodb.net"
    );
    console.log(result);
  } catch (err) {
    console.error(err);
  }
})();