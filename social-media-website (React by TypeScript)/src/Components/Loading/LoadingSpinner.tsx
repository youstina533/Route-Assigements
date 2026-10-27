import {CircularProgress} from "react-loader-spinner"

export default function LoadingSpinner() {
  return (
    <>
      <div className="w-full h-screen flex justify-center items-center">
        <CircularProgress
        height="100"
        width="100"
        color="#1C398E"
        ariaLabel="circular-progress-loading"
        wrapperStyle={{}}
        wrapperClass="wrapper-class"
        visible={true}
        strokeWidth={2}
        animationDuration={1}
        />
      </div>
    </>
  )
}
