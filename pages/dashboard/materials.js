import { LoadingButton } from "@mui/lab"
import { useState } from "react"
import { useSelector } from "react-redux"
import { DashboardLayout } from "../../components/Layout"
import { useDirectUploadFinishMutation, useDirectUploadStartMutation, useGetCourseMaterialsQuery } from "../../lib/services/otherAPI"

const CourseMaterials = () => {
    const { user } = useSelector(state => state.auth)
    const { data: {data = [] } = {} } = useGetCourseMaterialsQuery()
    console.log(data)
    const [uploading, setUploading] = useState(false)
    const [material, setMaterial] = useState(null)
    const [directUploadStart, {isLoading: startLoading}] = useDirectUploadStartMutation()
    const [directUploadFinish, {isLoading: finishLoading}] = useDirectUploadFinishMutation()
    
    const _directUploadStart = async ({ file_name, file_type }) => {
        const payload = { file_name, file_type, classroom: user?.student?.classroom.name}
        console.log(payload)
        const fulfilled = await directUploadStart(payload).unwrap()
        return fulfilled
    }
    const directUploadDo = async (data) => {
        const postData = new FormData();

        for (const key in data?.fields) {
            postData.append(key, data.fields[key]);
        }
        postData.append('file', material);
        
        setUploading(true)
        const fulfilled = await fetch(data?.url, { method: 'POST', body: postData })
        setUploading(false)

    }

    const _directUploadFinish = async (fileId) => {
        console.log({ file_id: fileId })
        const payload = {file_id: fileId}
        await directUploadFinish(payload).unwrap()
        
    }
    const handleFileChange = e => {
        const file = e.target.files[0]
        setMaterial(file)
    }

    const uploadMaterial = async () => {
        if (!material) return
        const startFulfilled = await _directUploadStart({ file_name: material.name, file_type: material.type })
        console.log(startFulfilled)
        await directUploadDo(startFulfilled)
        await _directUploadFinish(startFulfilled.id)
    }
    return (   
        <>
            <>Course Materials</>
            <input type="file" onChange={handleFileChange}/>
            <LoadingButton
              color="primary"
              variant="contained"
                onClick={uploadMaterial}
                fullWidth={false}
              loading={startLoading || uploading || finishLoading}
            >
              Upload Material
            </LoadingButton>
            <ol>
                {data.map((item) => (<li><a href={item.file} target="_blank">{item?.original_file_name} from { item.uploaded_by}</a></li>))}
            </ol>
        </>
    )

}

CourseMaterials.getLayout  = (page) => <DashboardLayout>{page}</DashboardLayout>

export default CourseMaterials