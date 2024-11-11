import { Suspense } from 'react'
import ResultPage from '@/components/ResultPage'
import { getStaticPaths, getStaticProps } from '../../../lib/dataFetch'

export { getStaticPaths, getStaticProps }

const Result = ({ makeId, year, models }) => {
  return (
    <Suspense
      fallback={
        <div className="text-center text-xl text-gray-500">Loading...</div>
      }
    >
      <ResultPage makeId={makeId} year={year} models={models} />
    </Suspense>
  )
}

export default Result
