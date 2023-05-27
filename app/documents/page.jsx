'use client'
import { useRef, useState } from 'react'
import { FileUpload } from 'primereact/fileupload'
import { Toast } from 'primereact/toast'
import { ProgressBar } from 'primereact/progressbar'
import { Tag } from 'primereact/tag'
import { Button } from 'primereact/button'

export default function Documents (){
    const [totalSize, setTotalSize] = useState(0)
    const [url, setUrl] = useState('/api/asesores')
    const [label, setLabel] = useState('Asesores')
    const fileUploadRef = useRef(null)
    const toast = useRef(null)

    const onTemplateSelect = (e) => {
        let _totalSize = totalSize;
        _totalSize += e.files[0].size
        setTotalSize(_totalSize)
    }

    const onTemplateUpload = (e) => {
        setTotalSize(e.files[0].size)
        toast.current.show({severity: 'info', summary: 'Success', detail: 'File Uploaded Succcesfully'});
        setTotalSize(0);
    }

    const onTemplateRemove = (file, callback) => {
        setTotalSize(totalSize - file.size);
        callback();
    }

    const onTemplateClear = () => {
        setTotalSize(0);
    }

    const onTemplateError = (e) => {
        setTotalSize(0)
        toast.current.show({severity: 'error', summary: 'Error', detail: 'Incorrect data file or incorrect format file'})
    }

    const headerTemplate = (options) => {
        const { className, chooseButton, uploadButton, cancelButton } = options;
        const value = totalSize/10000;
        const formatedValue = fileUploadRef && fileUploadRef.current ? fileUploadRef.current.formatSize(totalSize) : '0 B';

        return (
            <div className={className} style={{backgroundColor: '#e0e7ff', display: 'flex', alignItems: 'center', borderBottom: '1px solid #9ca3af'}}>
                {chooseButton}
                {uploadButton}
                {cancelButton}
                <ProgressBar value={value} displayValueTemplate={() => `${formatedValue} / 20 MB`} style={{width: '300px', height: '20px', marginLeft: 'auto', border: '1px solid #6366f1'}}></ProgressBar>
            </div>
        );
    }

    const itemTemplate = (file, props) => {
        return (
            <div className="flex align-items-center flex-wrap">
                <div className="flex align-items-center" style={{width: '40%'}}>
                    <img alt={file.name} role="presentation" src={file.objectURL} width={100} className='text-gray-400 mx-5 self-center'/>
                    <span className="flex flex-column text-left ml-3 items-center">
                        {file.name}
                        <small className='ms-4'>{new Date().toLocaleDateString()}</small>
                    </span>
                </div>
                <Tag value={props.formatSize} severity="warning" className="px-5 py-2 ml-4" />
                <Button type="button" icon="pi pi-times" className="p-button-outlined p-button-rounded p-button-danger ml-5" onClick={() => onTemplateRemove(file, props.onRemove)} />
            </div>
        )
    }

    const emptyTemplate = () => {
        return (
            <div className="grid justify-items-center mx-auto">
                <p style={{'fontSize': '1.2em', color: 'var(--text-color-secondary)'}} className="my-5">Drag and Drop File Here</p>
                <i className="pi pi-file block p-5" style={{'fontSize': '5em', borderRadius: '30%', backgroundColor: '#eef2ff', color: '#9ca3af'}}></i>
            </div>
        )
    }

    const chooseOptions = {icon: 'pi pi-fw pi-file', iconOnly: true, className: 'custom-choose-btn p-button-rounded p-button-outlined'};
    const uploadOptions = {icon: 'pi pi-fw pi-cloud-upload', iconOnly: true, className: 'custom-upload-btn p-button-success p-button-rounded p-button-outlined'};
    const cancelOptions = {icon: 'pi pi-fw pi-times', iconOnly: true, className: 'custom-cancel-btn p-button-danger p-button-rounded p-button-outlined'};    

    return (
        <>
            <Toast ref={toast}></Toast>
            <h1 className='mx-auto text-center mt-20 font-semibold text-3xl text-indigo-500'>Upload files {label}</h1>
            <section className='w-full grid items-center mt-10'>
                <button className='mx-auto py-2 lg:w-1/2 md:w-4/5 w-full border border-indigo-500 rounded-lg mt-5 bg-indigo-500 text-white hover:bg-indigo-600'
                onClick={() => {
                    setLabel('Asesores')
                    setUrl('/api/asesores')
                }} >Cargar Archivo Asesores</button>
                <button className='mx-auto py-2 lg:w-1/2 md:w-4/5 w-full border border-indigo-500 rounded-lg mt-5 bg-indigo-500 text-white hover:bg-indigo-600'
                onClick={() => {
                    setLabel('Clientes')
                    setUrl('/api/clientes')
                }} >Cargar Archivo Clientes</button>
            </section>
            <div className='py-10 mt-5 mx-auto lg:px-0 px-10 lg:w-1/2 md:w-4/5 w-full'>
                <FileUpload ref={fileUploadRef} name='files[]' url={url} accept='.csv' maxFileSize={20000000} onUpload={onTemplateUpload} onSelect={onTemplateSelect}
                    onError={onTemplateError} onClear={onTemplateClear} headerTemplate={headerTemplate} itemTemplate={itemTemplate} emptyTemplate={emptyTemplate}
                    chooseOptions={chooseOptions} uploadOptions={uploadOptions} cancelOptions={cancelOptions} className='border border-gray-400 rounded-md'/>
            </div>
        </>
    )
}