import '../app/globals.css'

const ResultPage = ({ makeId, year, models }) => {
  return (
    <div className="container mx-auto p-6 bg-gray-50 dark:bg-gray-900">
      <h1 className="text-4xl font-extrabold text-center text-gray-900 dark:text-white mb-10">
        Results for Make ID: {makeId} - Model Year: {year}
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {models.length > 0 ? (
          models.map((model, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 shadow-xl rounded-lg p-6 flex flex-col items-center justify-center transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
            >
              <h2 className="text-xl font-semibold text-center text-gray-900 dark:text-white mb-4">
                {model.Model_Name}
              </h2>
            </div>
          ))
        ) : (
          <div className="text-center text-xl text-gray-500">
            No models found for the selected make and year.
          </div>
        )}
      </div>
    </div>
  )
}

export default ResultPage
