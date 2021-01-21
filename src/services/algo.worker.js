const _ = require('lodash')

const rootlessDistance = (c1, c2) => {
  return Math.pow(c2.r - c1.r, 2) 
    + Math.pow(c2.g - c1.g, 2) 
    + Math.pow(c2.b - c1.b, 2)
}

const clusterPoints = (colors, centers) => {
  let newClusters = new Map()

  colors.forEach((color) => {
    let minD = 16581375 // 255^3
    let bestCenter = undefined

    centers.forEach(center => {
      const d = rootlessDistance(color, center)
      if (d < minD) {
        minD = d
        bestCenter = center
      }
    })

    let jsonBestCenter = JSON.stringify(bestCenter)
    if (!newClusters.has(jsonBestCenter))
      newClusters.set(jsonBestCenter, [])
    newClusters.get(jsonBestCenter).push(color)
  })

  return newClusters
}

const recenter = (clusters) => {
  let newCenters = new Set()

  clusters.forEach((points, _, __) => {
    let r = 0
    let g = 0
    let b = 0
    let a = 0

    points.forEach(val => {
      r += val.r
      g += val.g
      b += val.b
      a += val.a
    })

    let center = {
      r: Math.floor(r/points.length),
      g: Math.floor(g/points.length),
      b: Math.floor(b/points.length),
      a: Math.floor(a/points.length),
    }
    newCenters.add(center)
  })

  return newCenters
}

const kMeans = (colors, k, maxIters) => {
  let clusters = new Map()
  let currentCenters = new Set(_.sampleSize(colors, k))
  let oldCenters = new Set()

  let iters = 0
  while (!_.isEqual(currentCenters, oldCenters) && iters < maxIters) {
    oldCenters = currentCenters
    clusters = clusterPoints(colors, currentCenters)
    currentCenters = recenter(clusters)
    ++iters
  }

  return clusters
}

const imageDataToObjects = _.memoize(imageData => {
  let res = []
  for (let i = 0; i < imageData.data.length; i += 4) {
    let obj = {}
    obj.r = imageData.data[i]
    obj.g = imageData.data[i+1]
    obj.b = imageData.data[i+2]
    obj.a = imageData.data[i+3]
    
    // MAYBE THIS IS FUCKED
    obj.x = i/4 % imageData.width
    obj.y = Math.floor((i/4-obj.x) / imageData.width)
    res.push(obj)
  }

  return {
    colors: res,
    width: imageData.width,
    height: imageData.height
  }
})

const clustersToImageData = (clusters, width, height) => {
  let imageData = new ImageData(width, height)

  clusters.forEach((colors, center, _) => {
    let centerParsed = JSON.parse(center)

    colors.forEach(c => {
      let ind = (c.y * width + c.x)*4
      imageData.data[ind] = centerParsed.r
      imageData.data[ind+1] = centerParsed.g
      imageData.data[ind+2] = centerParsed.b
      imageData.data[ind+3] = centerParsed.a
    })
  })

  return imageData
}

export const kMeansImageData = ({imageData, k, maxIters}) => {
  const imageObj = imageDataToObjects(imageData)
  const kMeansClusters = kMeans(imageObj.colors, k, maxIters)
  return clustersToImageData(kMeansClusters, imageObj.width, imageObj.height)
}
