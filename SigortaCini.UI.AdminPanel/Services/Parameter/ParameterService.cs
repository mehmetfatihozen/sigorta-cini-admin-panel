using SigortaCini.Framework.Data.DTO;
using SigortaCini.Framework.Data.DTO.Admin.Parameter;
using SigortaCini.Framework.Data.DTO.Admin.Parameter.Upload;
using SigortaCini.Framework.IOC.Interfaces;
using SigortaCini.Framework.Restful;
using System.Collections.Generic;

namespace SigortaCini.UI.AdminPanel.Services.Parameter
{
    public interface IParameterService
    {
        #region Getters

        ApiResult<IEnumerable<BankParameterDTO>> GetBankParameters();
        ApiResult<IEnumerable<BuildingParameterDTO>> GetBuildingParameters();
        ApiResult<IEnumerable<BuildingYearParameterDTO>> GetBuildingYearParameters();
        ApiResult<IEnumerable<DepartmentParameterDTO>> GetDepartmentParameters();
        ApiResult<IEnumerable<InstitutionParameterDTO>> GetInstitutionParameters();
        ApiResult<IEnumerable<InstitutionTypeParameterDTO>> GetInstitutionTypeParameters();
        ApiResult<IEnumerable<InsurerParameterDTO>> GetInsurerParameters();
        ApiResult<IEnumerable<TotalFloorParameterDTO>> GetTotalFloorParameters();
        ApiResult<IEnumerable<UsingStyleParameterDTO>> GetUsingStyleParameters();
        ApiResult<IEnumerable<DepartmentParameterDTO>> GetDepartmentParametersByBankId(int bankId);

        #endregion

        #region Setters

        ApiResult<BankParameterDTO> InsertUpdateBankParameter(BankParameterDTO input);
        ApiResult<BuildingParameterDTO> InsertUpdateBuildingParameter(BuildingParameterDTO input);
        ApiResult<BuildingYearParameterDTO> InsertUpdateBuildingYearParameter(BuildingYearParameterDTO input);
        ApiResult<DepartmentParameterDTO> InsertUpdateDepartmentParameter(DepartmentParameterDTO input);
        ApiResult<InstitutionParameterDTO> InsertUpdateInstitutionParameter(InstitutionParameterDTO input);
        ApiResult<InstitutionTypeParameterDTO> InsertUpdateInstitutionTypeParameter(InstitutionTypeParameterDTO input);
        ApiResult<InsurerParameterDTO> InsertUpdateInsurerParameter(InsurerParameterDTO input);
        ApiResult<TotalFloorParameterDTO> InsertUpdateTotalFloorParameter(TotalFloorParameterDTO input);
        ApiResult<UsingStyleParameterDTO> InsertUpdateUsingStyleParameter(UsingStyleParameterDTO input);

        #endregion

        #region Common

        ApiResult<IEnumerable<ParameterDTO>> GetParametersByTypeIds(uint typeId);
        ApiResult<IEnumerable<ParameterDTO>> GetAllTheParameters();
        ApiResult<ParameterRequestDTO> InsertOrUpdateParameter(ParameterRequestDTO input);
        ApiResult<IEnumerable<ParameterTypeDTO>> GetParameterTypes();

        #endregion

        #region Imports

        ApiResult<bool> ExcelImportForBankParameters(BankParameterUploadDTO file);
        ApiResult<bool> ExcelImportForDepartmentParameters(DepartmentParameterUploadDTO file);

        #endregion

    }
    public class ParameterService : IParameterService, IScopedService
    {
        readonly RestfulClient _restfulClient;

        public ParameterService()
        {
            _restfulClient = new RestfulClient($"{StaticValues.DATAMANAGEMENT_ADMIN_API_URL}");
        }

        #region Commons

        public ApiResult<IEnumerable<ParameterDTO>> GetAllTheParameters()
        {
            return _restfulClient.Get<ApiResult<IEnumerable<ParameterDTO>>>("parameter/getalltheparameters");
        }

        public ApiResult<IEnumerable<ParameterDTO>> GetParametersByTypeIds(uint typeId)
        {
            return _restfulClient.Get<ApiResult<IEnumerable<ParameterDTO>>>($"parameter/getparametersbytypeids?typeId={typeId.ToString()}");
        }

        public ApiResult<ParameterRequestDTO> InsertOrUpdateParameter(ParameterRequestDTO input)
        {
            return _restfulClient.Post<ApiResult<ParameterRequestDTO>>("parameter/InsertOrUpdateParameter",input);
        }

        public ApiResult<IEnumerable<ParameterTypeDTO>> GetParameterTypes()
        {
            return _restfulClient.Get<ApiResult<IEnumerable<ParameterTypeDTO>>>("parameter/getparametertypes");
        }

        #endregion

        #region Getters

        public ApiResult<IEnumerable<DepartmentParameterDTO>> GetDepartmentParametersByBankId(int bankId)
        {
            return _restfulClient.Get<ApiResult<IEnumerable<DepartmentParameterDTO>>>($"parameter/getdepartmentparametersbybankid?bankId={bankId.ToString()}");
        }

        public ApiResult<IEnumerable<BankParameterDTO>> GetBankParameters()
        {
            return _restfulClient.Get<ApiResult<IEnumerable<BankParameterDTO>>>("parameter/getbankparameters", null);
        }

        public ApiResult<IEnumerable<BuildingParameterDTO>> GetBuildingParameters()
        {
            return _restfulClient.Get<ApiResult<IEnumerable<BuildingParameterDTO>>>("parameter/getbuildingparameters", null);
        }

        public ApiResult<IEnumerable<BuildingYearParameterDTO>> GetBuildingYearParameters()
        {
            return _restfulClient.Get<ApiResult<IEnumerable<BuildingYearParameterDTO>>>("parameter/getbuildingyearparameters", null);
        }

        public ApiResult<IEnumerable<DepartmentParameterDTO>> GetDepartmentParameters()
        {
            return _restfulClient.Get<ApiResult<IEnumerable<DepartmentParameterDTO>>>("parameter/getdepartmentparameters", null);
        }

        public ApiResult<IEnumerable<InstitutionParameterDTO>> GetInstitutionParameters()
        {
            return _restfulClient.Get<ApiResult<IEnumerable<InstitutionParameterDTO>>>("parameter/getinstitutionparameters", null);
        }

        public ApiResult<IEnumerable<InstitutionTypeParameterDTO>> GetInstitutionTypeParameters()
        {
            return _restfulClient.Get<ApiResult<IEnumerable<InstitutionTypeParameterDTO>>>("parameter/getinstitutiontypeparameters", null);
        }

        public ApiResult<IEnumerable<InsurerParameterDTO>> GetInsurerParameters()
        {
            return _restfulClient.Get<ApiResult<IEnumerable<InsurerParameterDTO>>>("parameter/getinsurerparameters", null);
        }

        public ApiResult<IEnumerable<TotalFloorParameterDTO>> GetTotalFloorParameters()
        {
            return _restfulClient.Get<ApiResult<IEnumerable<TotalFloorParameterDTO>>>("parameter/gettotalfloorparameters", null);
        }

        public ApiResult<IEnumerable<UsingStyleParameterDTO>> GetUsingStyleParameters()
        {
            return _restfulClient.Get<ApiResult<IEnumerable<UsingStyleParameterDTO>>>("parameter/getusingstyleparameters", null);
        }

        #endregion

        #region Setters

        public ApiResult<BankParameterDTO> InsertUpdateBankParameter(BankParameterDTO input)
        {
            return _restfulClient.Post<ApiResult<BankParameterDTO>>("parameter/insertupdatebankparameter", input);
        }

        public ApiResult<BuildingParameterDTO> InsertUpdateBuildingParameter(BuildingParameterDTO input)
        {
            return _restfulClient.Post<ApiResult<BuildingParameterDTO>>("parameter/insertupdatebuildingparameter", input);
        }

        public ApiResult<BuildingYearParameterDTO> InsertUpdateBuildingYearParameter(BuildingYearParameterDTO input)
        {
            return _restfulClient.Post<ApiResult<BuildingYearParameterDTO>>("parameter/insertupdatebuildingyearparameter", input);
        }

        public ApiResult<DepartmentParameterDTO> InsertUpdateDepartmentParameter(DepartmentParameterDTO input)
        {
            return _restfulClient.Post<ApiResult<DepartmentParameterDTO>>("parameter/insertupdatedepartmentparameter", input);
        }

        public ApiResult<InstitutionParameterDTO> InsertUpdateInstitutionParameter(InstitutionParameterDTO input)
        {
            return _restfulClient.Post<ApiResult<InstitutionParameterDTO>>("parameter/insertupdateinstitutionparameter", input);
        }

        public ApiResult<InstitutionTypeParameterDTO> InsertUpdateInstitutionTypeParameter(InstitutionTypeParameterDTO input)
        {
            return _restfulClient.Post<ApiResult<InstitutionTypeParameterDTO>>("parameter/insertupdateinstitutiontypeparameter", input);
        }

        public ApiResult<InsurerParameterDTO> InsertUpdateInsurerParameter(InsurerParameterDTO input)
        {
            return _restfulClient.Post<ApiResult<InsurerParameterDTO>>("parameter/insertupdateinsurerparameter", input);
        }

        public ApiResult<TotalFloorParameterDTO> InsertUpdateTotalFloorParameter(TotalFloorParameterDTO input)
        {
            return _restfulClient.Post<ApiResult<TotalFloorParameterDTO>>("parameter/insertupdatetotalfloorparameter", input);
        }

        public ApiResult<UsingStyleParameterDTO> InsertUpdateUsingStyleParameter(UsingStyleParameterDTO input)
        {
            return _restfulClient.Post<ApiResult<UsingStyleParameterDTO>>("parameter/insertupdateusingstyleparameter", input);
        }

        #endregion

        #region Imports

        public ApiResult<bool> ExcelImportForBankParameters(BankParameterUploadDTO file)
        {
            return _restfulClient.Post<ApiResult<bool>>("parameter/ExcelImportForBankParameters", file);
        }

        public ApiResult<bool> ExcelImportForDepartmentParameters(DepartmentParameterUploadDTO file)
        {
            return _restfulClient.Post<ApiResult<bool>>("parameter/ExcelImportForDepartmentParameters", file);
        }

        #endregion

    }
}
