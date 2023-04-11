import ReactStars from "react-stars"

interface Props {
  countRates: {
    rate: number,
    _count: {
      rate: number
    }
  }[]
}

export function BarRating({countRates} : Props) {

  const rate = countRates.find(rate => 
    rate.rate === 5
  )
  // console.log(rate)

  function getPercentage(numStars: number) {
    const rate = countRates.find(rate => rate.rate === numStars)
    
    let percentage = 0
    if (rate) {
      percentage = rate._count.rate * numStars / getTotalData() / 5 * 100
    }

    return percentage
  }

  function getTotalData() {
    let totalData = 0
    countRates.map((rate, index) => {
      totalData += rate._count.rate
    })

    return totalData
  }

  function getMeanRate() {
    let mean = 0

    if (getTotalData() !== 0) {
      countRates.map((rate) => {
        mean += rate._count.rate * rate.rate
      })

      mean /= getTotalData()
    }

    return mean
  }

  return (
    <>
      <div className="2xl:flex justify-between">
        <div>
          <div className="flex items-center">
            <span className=" font-bold text-black ">5 star</span>
            <div className="w-80 h-5 mx-4 bg-gray-400 rounded ">
              <div className="h-5 bg-blue-700 rounded" style={{ width: `${getPercentage(5)}%` }}></div>
            </div>
            <span className=" font-bold text-black ">{getPercentage(5)}%</span>
          </div>
          <div className="flex items-center mt-4">
            <span className=" font-bold text-black ">4 star</span>
            <div className="w-80 h-5 mx-4 bg-gray-400 rounded ">
              <div className="h-5 bg-blue-700 rounded" style={{ width: `${getPercentage(4)}%` }}></div>
            </div>
            <span className=" font-bold text-black ">{getPercentage(4)}%</span>
          </div>
          <div className="flex items-center mt-4">
            <span className=" font-bold text-black ">3 star</span>
            <div className="w-80 h-5 mx-4 bg-gray-400 rounded ">
              <div className="h-5 bg-blue-700 rounded" style={{ width: `${getPercentage(3)}%` }}></div>
            </div>
            <span className=" font-bold text-black ">{getPercentage(3)}%</span>
          </div>
          <div className="flex items-center mt-4">
            <span className=" font-bold text-black ">2 star</span>
            <div className="w-80 h-5 mx-4 bg-gray-400 rounded ">
              <div className="h-5 bg-blue-700 rounded" style={{ width: `${getPercentage(2)}%` }}></div>
            </div>
            <span className=" font-bold text-black ">{getPercentage(2)}%</span>
          </div>
          <div className="flex items-center mt-4">
            <span className=" font-bold text-black ">1 star</span>
            <div className="w-80 h-5 mx-4 bg-gray-400 rounded ">
              <div className="h-5 bg-blue-700 rounded" style={{ width: `${getPercentage(1)}%` }}></div>
            </div>
            <span className="font-bold text-black ">{getPercentage(1)}%</span>
          </div>
        </div>
        <div className="">
          <div className="flex items-center">
            <ReactStars count={5} size={25} color2={'#ffd700'} edit={false} value={parseInt(getMeanRate().toFixed(0))} />
            {/* <svg aria-hidden="true" className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <title>First star</title>
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
            </svg>
            <svg aria-hidden="true" className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <title>Second star</title>
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
            </svg>
            <svg aria-hidden="true" className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <title>Third star</title>
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
            </svg>
            <svg aria-hidden="true" className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <title>Fourth star</title>
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
            </svg>
            <svg aria-hidden="true" className="w-5 h-5 text-gray-300 dark:text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <title>Fifth star</title>
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
            </svg> */}
            <p className="ml-2  font-bold text-black">{getMeanRate()} out of 5</p>
          </div>
          <p className=" font-bold text-black">{getTotalData()} global ratings</p>
        </div>
      </div>
    </>
  );
}
