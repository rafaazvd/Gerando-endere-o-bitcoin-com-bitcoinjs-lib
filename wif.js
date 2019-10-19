var CryptoJS = require('cryptojs').Crypto
var ec = require('eccrypto')
var bs58 = require('bs58')
var bitcoin = require('bitcoinjs-lib')

var versao = '80'
var chavePrivada =CryptoJS.util.randomBytes(32);
var chavePrivadaHex = CryptoJS.util.bytesToHex(chavePrivada).toUpperCase();

//var chavePrivada = process.argv[2]

var versaoChave = versao + chavePrivadaHex;
var chavePublica = ec.getPublic(Buffer(CryptoJS.util.hexToBytes(chavePrivadaHex)))

var primeiroSha = CryptoJS.SHA256(CryptoJS.util.hexToBytes(versaoChave));
var segundoSha = CryptoJS.SHA256(CryptoJS.util.hexToBytes(primeiroSha));
var checksun = segundoSha.substr(0,8)
var wif = versaoChave + checksun
var wifinal = bs58.encode(new Buffer(CryptoJS.util.hexToBytes(wif)))

console.log('______________________________');
console.log('hash do hash da chave');
console.log(segundoSha);
console.log('______________________________');
console.log('os quatros primeiros bytes que sera o checksun do wif');
console.log(checksun); 
console.log('______________________________');
console.log('o wif .. chave com a versao mais o checksun');
console.log(wif);
console.log('______________________________');
console.log('o wif final convertido em base 58');
console.log(wifinal);
console.log('______________________________');
console.log('essa é a chave publica');
console.log(CryptoJS.util.bytesToHex(chavePublica));
console.log('______________________________');

var versaoNetwork = '00'
//chavePublicaBytes = chavePublica
hashChavePublica = CryptoJS.SHA256(chavePublica)
var hash160 = bitcoin.crypto.ripemd160(Buffer(CryptoJS.util.hexToBytes(hashChavePublica)))
//var hash1601 = CryptoJS.util.hexToBytes(hash160)
var hashBytes = Array.prototype.slice.call(hash160, 0)
hashBytes.unshift(CryptoJS.util.hexToBytes(versaoNetwork))

//hash do hash do hashBytes
var primeirohash = CryptoJS.SHA256(hashBytes)
var segundohash = CryptoJS.SHA256(CryptoJS.util.hexToBytes(primeirohash))
var checksunEndereco = segundohash.substr(0,8)
var endereco = versaoNetwork + CryptoJS.util.bytesToHex(hash160) + checksunEndereco
var enderecoFinal = bs58.encode(Buffer(CryptoJS.util.hexToBytes(endereco)))
console.log('###########################################################');
console.log('###########################################################');
console.log('######################Endereco Final#######################');
console.log(enderecoFinal)
console.log('###########################################################');
console.log('#######################chaveprivada#######################');
console.log(chavePrivada)
console.log('###########################################################');
console.log('#######################chave privada hex########################');
console.log(chavePrivadaHex)
