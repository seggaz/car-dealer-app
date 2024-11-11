import axios from 'axios'

export async function getStaticPaths() {
  const paths = await generateStaticParams()
  return {
    paths,
    fallback: 'blocking',
  }
}

export async function getStaticProps({ params }) {
  const { makeId, year } = params
  let models = []

  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/vehicles/GetModelsForMakeIdYear/makeId/${makeId}/modelyear/${year}?format=json`
    )
    models = response.data.Results || []
  } catch (error) {
    console.error('Error fetching models:', error)
  }

  return {
    props: {
      makeId,
      year,
      models,
    },
  }
}

export async function generateStaticParams() {
  const paths = []
  const currentYear = new Date().getFullYear()

  try {
    const makesResponse = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/vehicles/GetMakesForVehicleType/car?format=json`
    )
    const makes = makesResponse.data.Results

    for (let year = 2015; year <= currentYear; year++) {
      for (let make of makes) {
        if (make.MakeId) {
          paths.push({
            params: { makeId: String(make.MakeId), year: String(year) },
          })
        }
      }
    }
  } catch (error) {
    console.error('Error fetching makes:', error)
  }

  return paths
}
