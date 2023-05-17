<template>
  <div class="root">
    <div class="wrapper-mains">
      <h1>Unidades de Produção</h1>

      <table class="table table-responsive-md">
        <tr>
          <div style="display: flex; justify-content: space-between">
            <!-- Secção para adicionar UP -->

            <b-form inline>
              <label class="sr-only" for="inline-form-input-name">Name</label>
              <b-form-input
                id="inline-form-input-name"
                class="mb-2 mr-sm-2 mb-sm-0"
                placeholder="Jane Doe"
              ></b-form-input>

              <label class="sr-only" for="inline-form-input-username"
                >Username</label
              >
              <b-input-group prepend="@" class="mb-2 mr-sm-2 mb-sm-0">
                <b-form-input
                  id="inline-form-input-username"
                  placeholder="Username"
                ></b-form-input>
              </b-input-group>

              <b-form-checkbox class="mb-2 mr-sm-2 mb-sm-0"
                >Remember me</b-form-checkbox
              >

              <b-button variant="primary">Save</b-button>
            </b-form>
          </div>
        </tr>
      </table>
    </div>
  </div>
</template>

<style>
.container {
  display: flex;
  align-items: center;
}

table {
  border: 1px solid #aaa;
  width: 100%;
  border-collapse: collapse;
}

@media (max-width: 800px) {
  tr {
    display: block;
  }

  td {
    border: 1px solid black;
    padding-left: 10px;
    padding-right: 10px;
    display: inline-block;
    word-break: break-all;
  }
}

.left-column {
  width: 55%;
}

.right-column {
  width: 25%;
}

.checkout {
  float: right;
  text-align: center;
}
</style>

<style scoped>
.wrapper-mains {
  height: auto;
  background: white;
  text-align: center;
  margin: auto;
  padding: 20px;
}
.textarea {
  display: block;
  width: 100%;
  height: 70px;
  border-radius: 5px;
}
.tabela {
  margin-top: 180px;
}
.titulo {
  font-size: 20px;
}
@media (max-width: 660px) {
  .titulo {
    font-size: 25px;
    text-align: center !important;
  }
  .resumo {
    margin-top: 10px;
    text-align: right;
    margin-right: 40px;
  }
}
</style>
