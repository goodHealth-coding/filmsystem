module.exports = {
    outputDir: 'potato',
    assetsDir:'static',
    publicPath:process.env.NODE_ENV === 'production'
        ? '/potato/'
        : '/',
}
